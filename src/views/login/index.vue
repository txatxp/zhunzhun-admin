<template>
  <div class="login">
    <!-- 登录页头部 -->
    <div class="login-header">
      <div class="flex-y-center">
        <el-switch
          v-model="isDark"
          inline-prompt
          active-icon="Moon"
          inactive-icon="Sunny"
          @change="toggleTheme"
        />
        <lang-select class="ml-2 cursor-pointer" />
      </div>
    </div>

    <!-- 登录页内容 -->
    <div class="login-content">
      <div class="login-img">
        <el-image :src="loginImage" style="width: 210px" />
      </div>
      <div class="login-form">
        <el-form ref="loginFormRef" :model="loginData" :rules="loginRules">
          <!-- 用户名 -->
          <el-form-item prop="userName">
            <div class="input-wrapper">
              <el-icon class="mx-2">
                <User />
              </el-icon>
              <el-input
                ref="userName"
                v-model="loginData.userName"
                placeholder="请输入账号"
                name="userName"
                size="large"
                class="h-[48px]"
              />
            </div>
          </el-form-item>

          <!-- 密码 -->
          <el-tooltip :visible="isCapslock" :content="$t('login.capsLock')" placement="right">
            <el-form-item prop="passWord">
              <div class="input-wrapper">
                <el-icon class="mx-2">
                  <Lock />
                </el-icon>
                <el-input
                  v-model="loginData.passWord"
                  placeholder="请输入密码"
                  type="password"
                  name="passWord"
                  size="large"
                  class="h-[48px] pr-2"
                  show-password
                  @keyup="checkCapslock"
                  @keyup.enter="handleLoginSubmit"
                />
              </div>
            </el-form-item>
          </el-tooltip>

          <!-- 验证码 -->
          <el-form-item prop="captchaCode">
            <div class="input-wrapper">
              <svg-icon icon-class="captcha" class="mx-2" />
              <el-input
                v-model="loginData.captchaCode"
                auto-complete="off"
                size="large"
                class="flex-1"
                :placeholder="$t('login.captchaCode')"
                @keyup.enter="handleLoginSubmit"
              />

              <span class="captcha-img" @click="getCaptcha" v-html="captchaSvg"></span>
            </div>
          </el-form-item>
          <div class="flex-x-between w-full py-1">
            <span @click="getRoute">
              {{ $t("login.rememberMe") }}
            </span>

            <button @click="getInfo">
              {{ $t("login.forgetPassword") }}
            </button>
          </div>

          <!-- 登录按钮 -->
          <el-button
            :loading="loading"
            type="primary"
            size="large"
            class="w-full"
            @click.prevent="handleLoginSubmit"
          >
            {{ $t("login.login") }}
          </el-button>
        </el-form>
      </div>
    </div>

    <!-- 登录页底部 -->
    <div class="login-footer">
      <el-text size="small">
        Copyright © 2021 - 2024 youlai.tech All Rights Reserved.
        <el-link :underline="false" href="http://beian.miit.gov.cn/" target="_blank">
          皖ICP备20006496号-2
        </el-link>
      </el-text>
    </div>
  </div>
</template>

<script setup lang="ts">
import _ from "lodash-es";
import { LocationQuery, useRoute } from "vue-router";

import AuthAPI, { type LoginData } from "@/api/auth";
import router from "@/router";

import type { FormInstance } from "element-plus";

import { ThemeEnum } from "@/enums/ThemeEnum";

import { useSettingsStore, useUserStore, usePermissionStore } from "@/store";

const userStore = useUserStore();
const settingsStore = useSettingsStore();

const route = useRoute();
const { t } = useI18n();
const loginFormRef = ref<FormInstance>();

const isDark = ref(settingsStore.theme === ThemeEnum.DARK); // 是否暗黑模式
const loading = ref(false); // 按钮 loading 状态
const isCapslock = ref(false); // 是否大写锁定
const captchaBase64 = ref(); // 验证码图片Base64字符串

const loginImage = ref(new URL("../../assets/images/login-image.svg", import.meta.url).href);

const loginData = ref<LoginData>({
  userName: "",
  passWord: "",
  captchaCode: "",
});
const captchaSvg = ref();

const loginRules = computed(() => {
  return {
    userName: [
      {
        required: true,
        trigger: "blur",
        message: t("login.message.username.required"),
      },
    ],
    passWord: [
      {
        required: true,
        trigger: "blur",
        message: t("login.message.password.required"),
      },
      {
        min: 6,
        message: t("login.message.password.min"),
        trigger: "blur",
      },
    ],
    captchaCode: [
      {
        required: true,
        trigger: "blur",
        message: t("login.message.captchaCode.required"),
      },
    ],
  };
});

// 获取验证码
function getCaptcha() {
  AuthAPI.getCaptcha().then((data) => {
    captchaSvg.value = data;
  });
}

function arrayToTree(data: any, rootId: any = 0) {
  return _.chain(data)
    .filter((item) => item.pid === rootId)
    .map((item) => ({
      ...item,
      children: arrayToTree(data, item.id),
    }))
    .value();
}

async function getRoute() {
  const permissionStore = usePermissionStore();
  const userInfo = useStorage("userInfo", {} as any);
  const roleIds = userInfo.value.roleIds;
  const roleCodes = userInfo.value.roleCodes;
  const routeData = await permissionStore.generateRoutes({
    roleIds: roleIds,
    roleCodes: roleCodes,
    userId: userInfo.value.id,
  });
  let arr: any = [];
  if (routeData && routeData.length > 0) {
    routeData.forEach((item) => {
      let data = item.menuIds.replace(/\\/g, "");
      arr.push(JSON.parse(data));
    });
  }
  const result = _.unionBy(...arr, "menuId");
  const res = await permissionStore.getRoleMenus(result);
}
async function getInfo() {
  await userStore.getUserInfo();
}
// 登录
async function handleLoginSubmit() {
  loginFormRef.value?.validate((valid: boolean) => {
    if (valid) {
      loading.value = true;
      userStore
        .login(loginData.value)
        .then(async () => {
          await userStore.getUserInfo();
          // // 需要在路由跳转前加载字典数据，否则会出现字典数据未加载完成导致页面渲染异常
          // await dictStore.loadDictionaries();
          // // 跳转到登录前的页面
          // const { path, queryParams } = parseRedirect();
          router.push({ path: "/" });
        })
        .catch(() => {
          getCaptcha();
        })
        .finally(() => {
          loading.value = false;
        });
    }
  });
}

/**
 * 解析 redirect 字符串 为 path 和  queryParams
 *
 * @returns { path: string, queryParams: Record<string, string> } 解析后的 path 和 queryParams
 */
function parseRedirect(): {
  path: string;
  queryParams: Record<string, string>;
} {
  const query: LocationQuery = route.query;
  const redirect = (query.redirect as string) ?? "/";

  const url = new URL(redirect, window.location.origin);
  const path = url.pathname;
  const queryParams: Record<string, string> = {};

  url.searchParams.forEach((value, key) => {
    queryParams[key] = value;
  });

  return { path, queryParams };
}

// 主题切换
const toggleTheme = () => {
  const newTheme = settingsStore.theme === ThemeEnum.DARK ? ThemeEnum.LIGHT : ThemeEnum.DARK;
  settingsStore.changeTheme(newTheme);
};

// 检查输入大小写
function checkCapslock(event: KeyboardEvent) {
  // 防止浏览器密码自动填充时报错
  if (event instanceof KeyboardEvent) {
    isCapslock.value = event.getModifierState("CapsLock");
  }
}

// 设置登录凭证

onMounted(() => {
  getCaptcha();
});
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background: url("@/assets/images/login-background-light.jpg") no-repeat center right;

  .login-header {
    position: absolute;
    top: 0;
    display: flex;
    justify-content: right;
    width: 100%;
    padding: 15px;

    .logo {
      width: 26px;
      height: 26px;
    }

    .title {
      margin: auto 5px;
      font-size: 24px;
      font-weight: bold;
      color: #3b82f6;
    }
  }

  .login-content {
    display: flex;
    width: 960px;
    overflow: hidden;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: var(--el-box-shadow-light);

    @media (width <= 768px) {
      flex-direction: column;
      max-width: 100%;
      height: 100vh;
      padding: 0 30px;
      border-radius: 0;
      box-shadow: none;
    }

    .login-img {
      display: flex;
      flex: 3;
      align-items: center;
      justify-content: center;
      background: linear-gradient(60deg, #165dff, #6aa1ff);

      @media (width <= 768px) {
        display: none;
      }
    }

    .login-form {
      display: flex;
      flex: 2;
      flex-direction: column;
      justify-content: center;
      min-width: 400px;
      padding: 30px;

      @media (width <= 768px) {
        width: 100%;
        padding: 0 20px;
      }

      .form-title {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 0 20px;
        text-align: center;
      }

      .input-wrapper {
        display: flex;
        align-items: center;
        width: 100%;
      }

      .captcha-img {
        height: 48px;
        cursor: pointer;
        border-top-right-radius: 6px;
        border-bottom-right-radius: 6px;
      }

      .third-party-login {
        display: flex;
        justify-content: center;
        width: 100%;
        color: var(--el-text-color-secondary);

        *:not(:first-child) {
          margin-left: 20px;
        }

        .icon {
          cursor: pointer;
        }
      }
    }
  }

  .login-footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
  }
}

:deep(.el-form-item) {
  background: var(--el-input-bg-color);
  border: 1px solid var(--el-border-color);
  border-radius: 5px;
}

:deep(.el-input) {
  .el-input__wrapper {
    padding: 0;
    background-color: transparent;
    box-shadow: none;

    &.is-focus,
    &:hover {
      box-shadow: none !important;
    }

    input:-webkit-autofill {
      /* 通过延时渲染背景色变相去除背景颜色 */
      transition: background-color 1000s ease-in-out 0s;
    }
  }
}

html.dark {
  .login {
    background: url("@/assets/images/login-background-dark.jpg") no-repeat center right;

    .login-content {
      background: transparent;
      box-shadow: var(--el-box-shadow);
    }
  }
}
</style>
