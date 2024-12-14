<template>
  <el-dropdown trigger="click">
    <div class="flex-center h100% p13px">
      <img :src="logo" class="rounded-full mr-10px w24px h24px" />
      <span>{{ userStore.userInfo.username }}</span>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">
          {{ $t("navbar.logout") }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import logo from "@/assets/logo.png";
defineOptions({
  name: "UserProfile",
});

import { useTagsViewStore, useUserStore } from "@/store";
import { useUserStoreHook } from "@/store/modules/user";
const tagsViewStore = useTagsViewStore();
const userStore = useUserStore();

const route = useRoute();
const router = useRouter();

/**
 * 注销登出
 */
function logout() {
  ElMessageBox.confirm("确定注销并退出系统吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
    lockScroll: false,
  }).then(() => {
    useUserStoreHook().clearUserData();
    router.push(`/login?redirect=${route.fullPath}`);
  });
}
</script>

<style lang="scss" scoped></style>
