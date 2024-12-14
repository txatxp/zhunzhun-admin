import type { RouteRecordRaw } from "vue-router";
import { constantRoutes } from "@/router";
import { store } from "@/store";
import router from "@/router";
import _ from "lodash-es";
import { arrayToTree } from "@/utils/index";
import MenuAPI, { type RouteVO } from "@/api/system/menu";
const modules = import.meta.glob("../../views/**/**.vue");
const Layout = () => import("@/layout/index.vue");

// function arrayToTree(data: any, rootId: any = 0): any {
//   return _.chain(data)
//     .filter((item) => item.pid === rootId)
//     .map((item) => ({
//       ...item,
//       children: arrayToTree(data, item.id).length ? arrayToTree(data, item.id) : [],
//     }))
//     .value();
// }
export const usePermissionStore = defineStore("permission", () => {
  // 所有路由，包括静态和动态路由
  const routes = ref<RouteRecordRaw[]>([]);
  // 混合模式左侧菜单
  const mixLeftMenus = ref<RouteRecordRaw[]>([]);
  // 路由是否已加载
  const isRoutesLoaded = ref(false);

  /**
   * 生成动态路由
   */
  function generateRoutes(params: any) {
    return new Promise<RouteRecordRaw[]>((resolve, reject) => {
      MenuAPI.getRoutes(params)
        .then(async (data: any) => {
          // 多个角色
          let arr: any = [];
          if (data && data.length > 0) {
            data.forEach((item) => {
              let data = item.menuIds.replace(/\\/g, "");
              arr.push(JSON.parse(data));
            });
          }

          // 将多个数组按照 menuId 进行合并，取并集
          const result = _.unionBy(...arr, "menuId");

          // 根据多个合并过的角色，获取菜单列表
          const res = await getRoleMenus(result);

          res.forEach((item: any) => {
            item.meta = {};
            item.component = item.componentPath;
            item.meta.title = item.title;
            item.meta.icon = item.icon;
            item.meta.hidden = item.visible == 1 ? false : true;
            item.meta.keepAlive = true;
            item.meta.alwaysShow = item.alwaysShow === 0 ? false : true;
            item.meta.params = null;
          });
          const list = arrayToTree(res);
          console.log(list, "-------------list");
          const dynamicRoutes = transformRoutes(list);
          routes.value = constantRoutes.concat(dynamicRoutes);
          isRoutesLoaded.value = true;

          resolve(dynamicRoutes);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  function getRoleMenus(params: any) {
    return new Promise<RouteRecordRaw[]>((resolve, reject) => {
      MenuAPI.getRoleMenus(params)
        .then((data: any) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * 混合模式菜单下根据顶部菜单路径设置左侧菜单
   *
   * @param topMenuPath - 顶部菜单路径
   */
  const setMixLeftMenus = (topMenuPath: string) => {
    const matchedItem = routes.value.find((item) => item.path === topMenuPath);
    if (matchedItem && matchedItem.children) {
      mixLeftMenus.value = matchedItem.children;
    }
  };

  /**
   * 重置路由
   */
  const resetRouter = () => {
    // 删除动态路由，保留静态路由
    routes.value.forEach((route) => {
      if (route.name && !constantRoutes.find((r) => r.name === route.name)) {
        // 从 router 实例中移除动态路由
        router.removeRoute(route.name);
      }
    });

    routes.value = [];
    mixLeftMenus.value = [];
    isRoutesLoaded.value = false;
  };

  return {
    routes,
    getRoleMenus,
    generateRoutes,
    mixLeftMenus,
    setMixLeftMenus,
    isRoutesLoaded,
    resetRouter,
  };
});

/**
 * 转换路由数据为组件
 */
const transformRoutes = (routes: RouteVO[]) => {
  const asyncRoutes: RouteRecordRaw[] = [];
  routes.forEach((route) => {
    const tmpRoute = { ...route } as RouteRecordRaw;
    // 顶级目录，替换为 Layout 组件
    if (tmpRoute.component?.toString() == "Layout") {
      tmpRoute.component = Layout;
    } else {
      // 其他菜单，根据组件路径动态加载组件
      const component = modules[`../../views/${tmpRoute.component}.vue`];
      if (component) {
        tmpRoute.component = component;
      } else {
        tmpRoute.component = modules["../../views/error-page/404.vue"];
      }
    }

    if (tmpRoute.children) {
      tmpRoute.children = transformRoutes(route.children);
    }

    asyncRoutes.push(tmpRoute);
  });

  return asyncRoutes;
};

/**
 * 在组件外使用 Pinia store 实例 @see https://pinia.vuejs.org/core-concepts/outside-component-usage.html
 */
export function usePermissionStoreHook() {
  return usePermissionStore(store);
}
