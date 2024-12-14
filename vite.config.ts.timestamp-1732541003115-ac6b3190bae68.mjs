// vite.config.ts
import vue from "file:///D:/www/www/vue3-element-admin/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { loadEnv, defineConfig } from "file:///D:/www/www/vue3-element-admin/node_modules/vite/dist/node/index.js";
import AutoImport from "file:///D:/www/www/vue3-element-admin/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///D:/www/www/vue3-element-admin/node_modules/unplugin-vue-components/dist/vite.js";
import { ElementPlusResolver } from "file:///D:/www/www/vue3-element-admin/node_modules/unplugin-vue-components/dist/resolvers.js";
import { createSvgIconsPlugin } from "file:///D:/www/www/vue3-element-admin/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import mockDevServerPlugin from "file:///D:/www/www/vue3-element-admin/node_modules/vite-plugin-mock-dev-server/dist/index.js";
import UnoCSS from "file:///D:/www/www/vue3-element-admin/node_modules/unocss/dist/vite.mjs";
import { resolve } from "path";

// package.json
var name = "vue3-element-admin";
var version = "2.19.1";
var dependencies = {
  "@element-plus/icons-vue": "^2.3.1",
  "@stomp/stompjs": "^7.0.0",
  "@vueuse/core": "^10.11.1",
  "@wangeditor/editor": "^5.1.23",
  "@wangeditor/editor-for-vue": "5.1.10",
  "animate.css": "^4.1.1",
  axios: "^1.7.7",
  codemirror: "^5.65.18",
  "codemirror-editor-vue3": "^2.8.0",
  echarts: "^5.5.1",
  "element-plus": "^2.8.7",
  exceljs: "^4.4.0",
  "lodash-es": "^4.17.21",
  nprogress: "^0.2.0",
  "path-browserify": "^1.0.1",
  "path-to-regexp": "^6.3.0",
  pinia: "^2.2.6",
  qs: "^6.13.0",
  sortablejs: "^1.15.3",
  vue: "^3.5.12",
  "vue-i18n": "9.9.1",
  "vue-router": "^4.4.5"
};
var devDependencies = {
  "@commitlint/cli": "^19.5.0",
  "@commitlint/config-conventional": "^19.5.0",
  "@eslint/js": "^9.14.0",
  "@types/codemirror": "^5.60.15",
  "@types/lodash": "^4.17.13",
  "@types/node": "^22.9.0",
  "@types/nprogress": "^0.2.3",
  "@types/path-browserify": "^1.0.3",
  "@types/qs": "^6.9.17",
  "@types/sortablejs": "^1.15.8",
  "@typescript-eslint/eslint-plugin": "^8.14.0",
  "@typescript-eslint/parser": "^8.14.0",
  "@vitejs/plugin-vue": "^5.1.5",
  autoprefixer: "^10.4.20",
  commitizen: "^4.3.1",
  "cz-git": "1.9.4",
  eslint: "^9.14.0",
  "eslint-config-prettier": "^9.1.0",
  "eslint-plugin-prettier": "^5.2.1",
  "eslint-plugin-vue": "^9.31.0",
  globals: "^15.12.0",
  husky: "^9.1.6",
  "lint-staged": "^15.2.10",
  postcss: "^8.4.49",
  "postcss-html": "^1.7.0",
  "postcss-scss": "^4.0.9",
  prettier: "^3.3.3",
  sass: "^1.80.6",
  stylelint: "^16.10.0",
  "stylelint-config-html": "^1.1.0",
  "stylelint-config-recess-order": "^5.1.1",
  "stylelint-config-recommended-scss": "^14.1.0",
  "stylelint-config-recommended-vue": "^1.5.0",
  "stylelint-config-standard": "^36.0.1",
  terser: "^5.36.0",
  typescript: "5.5.4",
  "typescript-eslint": "^8.14.0",
  unocss: "^0.63.6",
  "unplugin-auto-import": "^0.18.3",
  "unplugin-vue-components": "^0.27.4",
  vite: "^5.4.11",
  "vite-plugin-mock-dev-server": "^1.8.0",
  "vite-plugin-svg-icons": "^2.0.1",
  "vue-eslint-parser": "^9.4.3",
  "vue-tsc": "^2.1.10"
};
var engines = {
  node: ">=18.0.0"
};

// vite.config.ts
var __vite_injected_original_dirname = "D:\\www\\www\\vue3-element-admin";
var __APP_INFO__ = {
  pkg: { name, version, engines, dependencies, devDependencies },
  buildTimestamp: Date.now()
};
var pathSrc = resolve(__vite_injected_original_dirname, "src");
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    resolve: {
      alias: {
        "@": pathSrc
      }
    },
    css: {
      preprocessorOptions: {
        // 定义全局 SCSS 变量
        scss: {
          javascriptEnabled: true,
          api: "modern-compiler",
          additionalData: `
            @use "@/styles/variables.scss" as *;
          `
        }
      }
    },
    server: {
      host: "0.0.0.0",
      port: +env.VITE_APP_PORT,
      open: true,
      proxy: {
        // 代理 /dev-api 的请求
        [env.VITE_APP_BASE_API]: {
          changeOrigin: true,
          // 代理目标地址：https://api.youlai.tech
          target: env.VITE_APP_API_URL,
          rewrite: (path) => path.replace(new RegExp("^" + env.VITE_APP_BASE_API), "")
        }
      }
    },
    plugins: [
      vue(),
      env.VITE_MOCK_DEV_SERVER === "true" ? mockDevServerPlugin() : null,
      UnoCSS({
        hmrTopLevelAwait: false
      }),
      // 自动导入配置 https://github.com/sxzz/element-plus-best-practices/blob/main/vite.config.ts
      AutoImport({
        // 导入 Vue 函数，如：ref, reactive, toRef 等
        imports: ["vue", "@vueuse/core", "pinia", "vue-router", "vue-i18n"],
        resolvers: [
          // 导入 Element Plus函数，如：ElMessage, ElMessageBox 等
          ElementPlusResolver()
        ],
        eslintrc: {
          enabled: false,
          filepath: "./.eslintrc-auto-import.json",
          globalsPropValue: true
        },
        vueTemplate: true,
        // 导入函数类型声明文件路径 (false:关闭自动生成)
        dts: false
        // dts: "src/types/auto-imports.d.ts",
      }),
      Components({
        resolvers: [
          // 导入 Element Plus 组件
          ElementPlusResolver()
        ],
        // 指定自定义组件位置(默认:src/components)
        dirs: ["src/components", "src/**/components"],
        // 导入组件类型声明文件路径 (false:关闭自动生成)
        dts: false
        // dts: "src/types/components.d.ts",
      }),
      createSvgIconsPlugin({
        // 缓存图标位置
        iconDirs: [resolve(pathSrc, "assets/icons")],
        symbolId: "icon-[dir]-[name]"
      })
    ],
    // 预加载项目必需的组件
    optimizeDeps: {
      include: [
        "vue",
        "vue-router",
        "element-plus",
        "pinia",
        "axios",
        "@vueuse/core",
        "sortablejs",
        "exceljs",
        "path-to-regexp",
        "echarts",
        "@wangeditor/editor",
        "@wangeditor/editor-for-vue",
        "vue-i18n",
        "path-browserify",
        "element-plus/es/components/form/style/css",
        "element-plus/es/components/form-item/style/css",
        "element-plus/es/components/button/style/css",
        "element-plus/es/components/input/style/css",
        "element-plus/es/components/input-number/style/css",
        "element-plus/es/components/switch/style/css",
        "element-plus/es/components/upload/style/css",
        "element-plus/es/components/menu/style/css",
        "element-plus/es/components/col/style/css",
        "element-plus/es/components/icon/style/css",
        "element-plus/es/components/row/style/css",
        "element-plus/es/components/tag/style/css",
        "element-plus/es/components/dialog/style/css",
        "element-plus/es/components/loading/style/css",
        "element-plus/es/components/radio/style/css",
        "element-plus/es/components/radio-group/style/css",
        "element-plus/es/components/popover/style/css",
        "element-plus/es/components/scrollbar/style/css",
        "element-plus/es/components/tooltip/style/css",
        "element-plus/es/components/dropdown/style/css",
        "element-plus/es/components/dropdown-menu/style/css",
        "element-plus/es/components/dropdown-item/style/css",
        "element-plus/es/components/sub-menu/style/css",
        "element-plus/es/components/menu-item/style/css",
        "element-plus/es/components/divider/style/css",
        "element-plus/es/components/card/style/css",
        "element-plus/es/components/link/style/css",
        "element-plus/es/components/breadcrumb/style/css",
        "element-plus/es/components/breadcrumb-item/style/css",
        "element-plus/es/components/table/style/css",
        "element-plus/es/components/tree-select/style/css",
        "element-plus/es/components/table-column/style/css",
        "element-plus/es/components/select/style/css",
        "element-plus/es/components/option/style/css",
        "element-plus/es/components/pagination/style/css",
        "element-plus/es/components/tree/style/css",
        "element-plus/es/components/alert/style/css",
        "element-plus/es/components/radio-button/style/css",
        "element-plus/es/components/checkbox-group/style/css",
        "element-plus/es/components/checkbox/style/css",
        "element-plus/es/components/tabs/style/css",
        "element-plus/es/components/tab-pane/style/css",
        "element-plus/es/components/rate/style/css",
        "element-plus/es/components/date-picker/style/css",
        "element-plus/es/components/notification/style/css",
        "element-plus/es/components/image/style/css",
        "element-plus/es/components/statistic/style/css",
        "element-plus/es/components/watermark/style/css",
        "element-plus/es/components/config-provider/style/css",
        "element-plus/es/components/text/style/css",
        "element-plus/es/components/drawer/style/css",
        "element-plus/es/components/color-picker/style/css",
        "element-plus/es/components/backtop/style/css",
        "element-plus/es/components/message-box/style/css",
        "element-plus/es/components/skeleton/style/css",
        "element-plus/es/components/skeleton/style/css",
        "element-plus/es/components/skeleton-item/style/css",
        "element-plus/es/components/badge/style/css",
        "element-plus/es/components/steps/style/css",
        "element-plus/es/components/step/style/css",
        "element-plus/es/components/avatar/style/css",
        "element-plus/es/components/descriptions/style/css",
        "element-plus/es/components/descriptions-item/style/css",
        "element-plus/es/components/checkbox-group/style/css",
        "element-plus/es/components/progress/style/css",
        "element-plus/es/components/image-viewer/style/css",
        "element-plus/es/components/empty/style/css"
      ]
    },
    // 构建配置
    build: {
      chunkSizeWarningLimit: 2e3,
      // 消除打包大小超过500kb警告
      minify: "terser",
      // Vite 2.6.x 以上需要配置 minify: "terser", terserOptions 才能生效
      terserOptions: {
        compress: {
          keep_infinity: true,
          // 防止 Infinity 被压缩成 1/0，这可能会导致 Chrome 上的性能问题
          drop_console: false,
          // 生产环境去除 console
          drop_debugger: true
          // 生产环境去除 debugger
        },
        format: {
          comments: false
          // 删除注释
        }
      },
      rollupOptions: {
        output: {
          // manualChunks: {
          //   "vue-i18n": ["vue-i18n"],
          // },
          // 用于从入口点创建的块的打包输出格式[name]表示文件名,[hash]表示该文件内容hash值
          entryFileNames: "js/[name].[hash].js",
          // 用于命名代码拆分时创建的共享块的输出命名
          chunkFileNames: "js/[name].[hash].js",
          // 用于输出静态资源的命名，[ext]表示文件扩展名
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name.split(".");
            let extType = info[info.length - 1];
            if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i.test(assetInfo.name)) {
              extType = "media";
            } else if (/\.(png|jpe?g|gif|svg)(\?.*)?$/.test(assetInfo.name)) {
              extType = "img";
            } else if (/\.(woff2?|eot|ttf|otf)(\?.*)?$/i.test(assetInfo.name)) {
              extType = "fonts";
            }
            return `${extType}/[name].[hash].[ext]`;
          }
        }
      }
    },
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__)
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicGFja2FnZS5qc29uIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcd3d3XFxcXHd3d1xcXFx2dWUzLWVsZW1lbnQtYWRtaW5cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXHd3d1xcXFx3d3dcXFxcdnVlMy1lbGVtZW50LWFkbWluXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi93d3cvd3d3L3Z1ZTMtZWxlbWVudC1hZG1pbi92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB2dWUgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXZ1ZVwiO1xyXG5pbXBvcnQgeyB0eXBlIFVzZXJDb25maWcsIHR5cGUgQ29uZmlnRW52LCBsb2FkRW52LCBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xyXG5cclxuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSBcInVucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGVcIjtcclxuaW1wb3J0IENvbXBvbmVudHMgZnJvbSBcInVucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGVcIjtcclxuaW1wb3J0IHsgRWxlbWVudFBsdXNSZXNvbHZlciB9IGZyb20gXCJ1bnBsdWdpbi12dWUtY29tcG9uZW50cy9yZXNvbHZlcnNcIjtcclxuXHJcbmltcG9ydCB7IGNyZWF0ZVN2Z0ljb25zUGx1Z2luIH0gZnJvbSBcInZpdGUtcGx1Z2luLXN2Zy1pY29uc1wiO1xyXG5pbXBvcnQgbW9ja0RldlNlcnZlclBsdWdpbiBmcm9tIFwidml0ZS1wbHVnaW4tbW9jay1kZXYtc2VydmVyXCI7XHJcblxyXG5pbXBvcnQgVW5vQ1NTIGZyb20gXCJ1bm9jc3Mvdml0ZVwiO1xyXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSBcInBhdGhcIjtcclxuaW1wb3J0IHsgbmFtZSwgdmVyc2lvbiwgZW5naW5lcywgZGVwZW5kZW5jaWVzLCBkZXZEZXBlbmRlbmNpZXMgfSBmcm9tIFwiLi9wYWNrYWdlLmpzb25cIjtcclxuXHJcbi8vIFx1NUU3M1x1NTNGMFx1NzY4NFx1NTQwRFx1NzlGMFx1MzAwMVx1NzI0OFx1NjcyQ1x1MzAwMVx1OEZEMFx1ODg0Q1x1NjI0MFx1OTcwMFx1NzY4NCBub2RlIFx1NzI0OFx1NjcyQ1x1MzAwMVx1NEY5RFx1OEQ1Nlx1MzAwMVx1Njc4NFx1NUVGQVx1NjVGNlx1OTVGNFx1NzY4NFx1N0M3Qlx1NTc4Qlx1NjNEMFx1NzkzQVxyXG5jb25zdCBfX0FQUF9JTkZPX18gPSB7XHJcbiAgcGtnOiB7IG5hbWUsIHZlcnNpb24sIGVuZ2luZXMsIGRlcGVuZGVuY2llcywgZGV2RGVwZW5kZW5jaWVzIH0sXHJcbiAgYnVpbGRUaW1lc3RhbXA6IERhdGUubm93KCksXHJcbn07XHJcblxyXG5jb25zdCBwYXRoU3JjID0gcmVzb2x2ZShfX2Rpcm5hbWUsIFwic3JjXCIpO1xyXG4vLyBWaXRlXHU5MTREXHU3RjZFICBodHRwczovL2NuLnZpdGVqcy5kZXYvY29uZmlnXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH06IENvbmZpZ0Vudik6IFVzZXJDb25maWcgPT4ge1xyXG4gIGNvbnN0IGVudiA9IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSk7XHJcbiAgcmV0dXJuIHtcclxuICAgIHJlc29sdmU6IHtcclxuICAgICAgYWxpYXM6IHtcclxuICAgICAgICBcIkBcIjogcGF0aFNyYyxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBjc3M6IHtcclxuICAgICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xyXG4gICAgICAgIC8vIFx1NUI5QVx1NEU0OVx1NTE2OFx1NUM0MCBTQ1NTIFx1NTNEOFx1OTFDRlxyXG4gICAgICAgIHNjc3M6IHtcclxuICAgICAgICAgIGphdmFzY3JpcHRFbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgYXBpOiBcIm1vZGVybi1jb21waWxlclwiLFxyXG4gICAgICAgICAgYWRkaXRpb25hbERhdGE6IGBcclxuICAgICAgICAgICAgQHVzZSBcIkAvc3R5bGVzL3ZhcmlhYmxlcy5zY3NzXCIgYXMgKjtcclxuICAgICAgICAgIGAsXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBzZXJ2ZXI6IHtcclxuICAgICAgaG9zdDogXCIwLjAuMC4wXCIsXHJcbiAgICAgIHBvcnQ6ICtlbnYuVklURV9BUFBfUE9SVCxcclxuICAgICAgb3BlbjogdHJ1ZSxcclxuICAgICAgcHJveHk6IHtcclxuICAgICAgICAvLyBcdTRFRTNcdTc0MDYgL2Rldi1hcGkgXHU3Njg0XHU4QkY3XHU2QzQyXHJcbiAgICAgICAgW2Vudi5WSVRFX0FQUF9CQVNFX0FQSV06IHtcclxuICAgICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcclxuICAgICAgICAgIC8vIFx1NEVFM1x1NzQwNlx1NzZFRVx1NjgwN1x1NTczMFx1NTc0MFx1RkYxQWh0dHBzOi8vYXBpLnlvdWxhaS50ZWNoXHJcbiAgICAgICAgICB0YXJnZXQ6IGVudi5WSVRFX0FQUF9BUElfVVJMLFxyXG4gICAgICAgICAgcmV3cml0ZTogKHBhdGgpID0+IHBhdGgucmVwbGFjZShuZXcgUmVnRXhwKFwiXlwiICsgZW52LlZJVEVfQVBQX0JBU0VfQVBJKSwgXCJcIiksXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBwbHVnaW5zOiBbXHJcbiAgICAgIHZ1ZSgpLFxyXG4gICAgICBlbnYuVklURV9NT0NLX0RFVl9TRVJWRVIgPT09IFwidHJ1ZVwiID8gbW9ja0RldlNlcnZlclBsdWdpbigpIDogbnVsbCxcclxuICAgICAgVW5vQ1NTKHtcclxuICAgICAgICBobXJUb3BMZXZlbEF3YWl0OiBmYWxzZSxcclxuICAgICAgfSksXHJcbiAgICAgIC8vIFx1ODFFQVx1NTJBOFx1NUJGQ1x1NTE2NVx1OTE0RFx1N0Y2RSBodHRwczovL2dpdGh1Yi5jb20vc3h6ei9lbGVtZW50LXBsdXMtYmVzdC1wcmFjdGljZXMvYmxvYi9tYWluL3ZpdGUuY29uZmlnLnRzXHJcbiAgICAgIEF1dG9JbXBvcnQoe1xyXG4gICAgICAgIC8vIFx1NUJGQ1x1NTE2NSBWdWUgXHU1MUZEXHU2NTcwXHVGRjBDXHU1OTgyXHVGRjFBcmVmLCByZWFjdGl2ZSwgdG9SZWYgXHU3QjQ5XHJcbiAgICAgICAgaW1wb3J0czogW1widnVlXCIsIFwiQHZ1ZXVzZS9jb3JlXCIsIFwicGluaWFcIiwgXCJ2dWUtcm91dGVyXCIsIFwidnVlLWkxOG5cIl0sXHJcbiAgICAgICAgcmVzb2x2ZXJzOiBbXHJcbiAgICAgICAgICAvLyBcdTVCRkNcdTUxNjUgRWxlbWVudCBQbHVzXHU1MUZEXHU2NTcwXHVGRjBDXHU1OTgyXHVGRjFBRWxNZXNzYWdlLCBFbE1lc3NhZ2VCb3ggXHU3QjQ5XHJcbiAgICAgICAgICBFbGVtZW50UGx1c1Jlc29sdmVyKCksXHJcbiAgICAgICAgXSxcclxuICAgICAgICBlc2xpbnRyYzoge1xyXG4gICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICBmaWxlcGF0aDogXCIuLy5lc2xpbnRyYy1hdXRvLWltcG9ydC5qc29uXCIsXHJcbiAgICAgICAgICBnbG9iYWxzUHJvcFZhbHVlOiB0cnVlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdnVlVGVtcGxhdGU6IHRydWUsXHJcbiAgICAgICAgLy8gXHU1QkZDXHU1MTY1XHU1MUZEXHU2NTcwXHU3QzdCXHU1NzhCXHU1OEYwXHU2NjBFXHU2NTg3XHU0RUY2XHU4REVGXHU1Rjg0IChmYWxzZTpcdTUxNzNcdTk1RURcdTgxRUFcdTUyQThcdTc1MUZcdTYyMTApXHJcbiAgICAgICAgZHRzOiBmYWxzZSxcclxuICAgICAgICAvLyBkdHM6IFwic3JjL3R5cGVzL2F1dG8taW1wb3J0cy5kLnRzXCIsXHJcbiAgICAgIH0pLFxyXG4gICAgICBDb21wb25lbnRzKHtcclxuICAgICAgICByZXNvbHZlcnM6IFtcclxuICAgICAgICAgIC8vIFx1NUJGQ1x1NTE2NSBFbGVtZW50IFBsdXMgXHU3RUM0XHU0RUY2XHJcbiAgICAgICAgICBFbGVtZW50UGx1c1Jlc29sdmVyKCksXHJcbiAgICAgICAgXSxcclxuICAgICAgICAvLyBcdTYzMDdcdTVCOUFcdTgxRUFcdTVCOUFcdTRFNDlcdTdFQzRcdTRFRjZcdTRGNERcdTdGNkUoXHU5RUQ4XHU4QkE0OnNyYy9jb21wb25lbnRzKVxyXG4gICAgICAgIGRpcnM6IFtcInNyYy9jb21wb25lbnRzXCIsIFwic3JjLyoqL2NvbXBvbmVudHNcIl0sXHJcbiAgICAgICAgLy8gXHU1QkZDXHU1MTY1XHU3RUM0XHU0RUY2XHU3QzdCXHU1NzhCXHU1OEYwXHU2NjBFXHU2NTg3XHU0RUY2XHU4REVGXHU1Rjg0IChmYWxzZTpcdTUxNzNcdTk1RURcdTgxRUFcdTUyQThcdTc1MUZcdTYyMTApXHJcbiAgICAgICAgZHRzOiBmYWxzZSxcclxuICAgICAgICAvLyBkdHM6IFwic3JjL3R5cGVzL2NvbXBvbmVudHMuZC50c1wiLFxyXG4gICAgICB9KSxcclxuICAgICAgY3JlYXRlU3ZnSWNvbnNQbHVnaW4oe1xyXG4gICAgICAgIC8vIFx1N0YxM1x1NUI1OFx1NTZGRVx1NjgwN1x1NEY0RFx1N0Y2RVxyXG4gICAgICAgIGljb25EaXJzOiBbcmVzb2x2ZShwYXRoU3JjLCBcImFzc2V0cy9pY29uc1wiKV0sXHJcbiAgICAgICAgc3ltYm9sSWQ6IFwiaWNvbi1bZGlyXS1bbmFtZV1cIixcclxuICAgICAgfSksXHJcbiAgICBdLFxyXG4gICAgLy8gXHU5ODg0XHU1MkEwXHU4RjdEXHU5ODc5XHU3NkVFXHU1RkM1XHU5NzAwXHU3Njg0XHU3RUM0XHU0RUY2XHJcbiAgICBvcHRpbWl6ZURlcHM6IHtcclxuICAgICAgaW5jbHVkZTogW1xyXG4gICAgICAgIFwidnVlXCIsXHJcbiAgICAgICAgXCJ2dWUtcm91dGVyXCIsXHJcbiAgICAgICAgXCJlbGVtZW50LXBsdXNcIixcclxuICAgICAgICBcInBpbmlhXCIsXHJcbiAgICAgICAgXCJheGlvc1wiLFxyXG4gICAgICAgIFwiQHZ1ZXVzZS9jb3JlXCIsXHJcbiAgICAgICAgXCJzb3J0YWJsZWpzXCIsXHJcbiAgICAgICAgXCJleGNlbGpzXCIsXHJcbiAgICAgICAgXCJwYXRoLXRvLXJlZ2V4cFwiLFxyXG4gICAgICAgIFwiZWNoYXJ0c1wiLFxyXG4gICAgICAgIFwiQHdhbmdlZGl0b3IvZWRpdG9yXCIsXHJcbiAgICAgICAgXCJAd2FuZ2VkaXRvci9lZGl0b3ItZm9yLXZ1ZVwiLFxyXG4gICAgICAgIFwidnVlLWkxOG5cIixcclxuICAgICAgICBcInBhdGgtYnJvd3NlcmlmeVwiLFxyXG4gICAgICAgIFwiZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvZm9ybS9zdHlsZS9jc3NcIixcclxuICAgICAgICBcImVsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL2Zvcm0taXRlbS9zdHlsZS9jc3NcIixcclxuICAgICAgICBcImVsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL2J1dHRvbi9zdHlsZS9jc3NcIixcclxuICAgICAgICBcImVsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL2lucHV0L3N0eWxlL2Nzc1wiLFxyXG4gICAgICAgIFwiZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvaW5wdXQtbnVtYmVyL3N0eWxlL2Nzc1wiLFxyXG4gICAgICAgIFwiZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvc3dpdGNoL3N0eWxlL2Nzc1wiLFxyXG4gICAgICAgIFwiZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvdXBsb2FkL3N0eWxlL2Nzc1wiLFxyXG4gICAgICAgIFwiZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvbWVudS9zdHlsZS9jc3NcIixcclxuICAgICAgICBcImVsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL2NvbC9zdHlsZS9jc3NcIixcclxuICAgICAgICBcImVsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL2ljb24vc3R5bGUvY3NzXCIsXHJcbiAgICAgICAgXCJlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9yb3cvc3R5bGUvY3NzXCIsXHJcbiAgICAgICAgXCJlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy90YWcvc3R5bGUvY3NzXCIsXHJcbiAgICAgICAgXCJlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9kaWFsb2cvc3R5bGUvY3NzXCIsXHJcbiAgICAgICAgXCJlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9sb2FkaW5nL3N0eWxlL2Nzc1wiLFxyXG4gICAgICAgIFwiZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvcmFkaW8vc3R5bGUvY3NzXCIsXHJcbiAgICAgICAgXCJlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9yYWRpby1ncm91cC9zdHlsZS9jc3NcIixcclxuICAgICAgICBcImVsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL3BvcG92ZXIvc3R5bGUvY3NzXCIsXHJcbiAgICAgICAgXCJlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9zY3JvbGxiYXIvc3R5bGUvY3NzXCIsXHJcbiAgICAgICAgXCJlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy90b29sdGlwL3N0eWxlL2Nzc1wiLFxyXG4gICAgICAgIFwiZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvZHJvcGRvd24vc3R5bGUvY3NzXCIsXHJcbiAgICAgICAgXCJlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9kcm9wZG93bi1tZW51L3N0eWxlL2Nzc1wiLFxyXG4gICAgICAgIFwiZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvZHJvcGRvd24taXRlbS9zdHlsZS9jc3NcIixcclxuICAgICAgICBcImVsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL3N1Yi1tZW51L3N0eWxlL2Nzc1wiLFxyXG4gICAgICAgIFwiZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvbWVudS1pdGVtL3N0eWxlL2Nzc1wiLFxyXG4gICAgICAgIFwiZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvZGl2aWRlci9zdHlsZS9jc3NcIixcclxuICAgICAgICBcImVsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL2NhcmQvc3R5bGUvY3NzXCIsXHJcbiAgICAgICAgXCJlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9saW5rL3N0eWxlL2Nzc1wiLFxyXG4gICAgICAgIFwiZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvYnJlYWRjcnVtYi9zdHlsZS9jc3NcIixcclxuICAgICAgICBcImVsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL2JyZWFkY3J1bWItaXRlbS9zdHlsZS9jc3NcIixcclxuICAgICAgICBcImVsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL3RhYmxlL3N0eWxlL2Nzc1wiLFxyXG4gICAgICAgIFwiZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvdHJlZS1zZWxlY3Qvc3R5bGUvY3NzXCIsXHJcbiAgICAgICAgXCJlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy90YWJsZS1jb2x1bW4vc3R5bGUvY3NzXCIsXHJcbiAgICAgICAgXCJlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9zZWxlY3Qvc3R5bGUvY3NzXCIsXHJcbiAgICAgICAgXCJlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9vcHRpb24vc3R5bGUvY3NzXCIsXHJcbiAgICAgICAgXCJlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9wYWdpbmF0aW9uL3N0eWxlL2Nzc1wiLFxyXG4gICAgICAgIFwiZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvdHJlZS9zdHlsZS9jc3NcIixcclxuICAgICAgICBcImVsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL2FsZXJ0L3N0eWxlL2Nzc1wiLFxyXG4gICAgICAgIFwiZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvcmFkaW8tYnV0dG9uL3N0eWxlL2Nzc1wiLFxyXG4gICAgICAgIFwiZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvY2hlY2tib3gtZ3JvdXAvc3R5bGUvY3NzXCIsXHJcbiAgICAgICAgXCJlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9jaGVja2JveC9zdHlsZS9jc3NcIixcclxuICAgICAgICBcImVsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL3RhYnMvc3R5bGUvY3NzXCIsXHJcbiAgICAgICAgXCJlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy90YWItcGFuZS9zdHlsZS9jc3NcIixcclxuICAgICAgICBcImVsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL3JhdGUvc3R5bGUvY3NzXCIsXHJcbiAgICAgICAgXCJlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9kYXRlLXBpY2tlci9zdHlsZS9jc3NcIixcclxuICAgICAgICBcImVsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL25vdGlmaWNhdGlvbi9zdHlsZS9jc3NcIixcclxuICAgICAgICBcImVsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL2ltYWdlL3N0eWxlL2Nzc1wiLFxyXG4gICAgICAgIFwiZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvc3RhdGlzdGljL3N0eWxlL2Nzc1wiLFxyXG4gICAgICAgIFwiZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvd2F0ZXJtYXJrL3N0eWxlL2Nzc1wiLFxyXG4gICAgICAgIFwiZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvY29uZmlnLXByb3ZpZGVyL3N0eWxlL2Nzc1wiLFxyXG4gICAgICAgIFwiZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvdGV4dC9zdHlsZS9jc3NcIixcclxuICAgICAgICBcImVsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL2RyYXdlci9zdHlsZS9jc3NcIixcclxuICAgICAgICBcImVsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL2NvbG9yLXBpY2tlci9zdHlsZS9jc3NcIixcclxuICAgICAgICBcImVsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL2JhY2t0b3Avc3R5bGUvY3NzXCIsXHJcbiAgICAgICAgXCJlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9tZXNzYWdlLWJveC9zdHlsZS9jc3NcIixcclxuICAgICAgICBcImVsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL3NrZWxldG9uL3N0eWxlL2Nzc1wiLFxyXG4gICAgICAgIFwiZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvc2tlbGV0b24vc3R5bGUvY3NzXCIsXHJcbiAgICAgICAgXCJlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9za2VsZXRvbi1pdGVtL3N0eWxlL2Nzc1wiLFxyXG4gICAgICAgIFwiZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvYmFkZ2Uvc3R5bGUvY3NzXCIsXHJcbiAgICAgICAgXCJlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9zdGVwcy9zdHlsZS9jc3NcIixcclxuICAgICAgICBcImVsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL3N0ZXAvc3R5bGUvY3NzXCIsXHJcbiAgICAgICAgXCJlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9hdmF0YXIvc3R5bGUvY3NzXCIsXHJcbiAgICAgICAgXCJlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9kZXNjcmlwdGlvbnMvc3R5bGUvY3NzXCIsXHJcbiAgICAgICAgXCJlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9kZXNjcmlwdGlvbnMtaXRlbS9zdHlsZS9jc3NcIixcclxuICAgICAgICBcImVsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL2NoZWNrYm94LWdyb3VwL3N0eWxlL2Nzc1wiLFxyXG4gICAgICAgIFwiZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvcHJvZ3Jlc3Mvc3R5bGUvY3NzXCIsXHJcbiAgICAgICAgXCJlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9pbWFnZS12aWV3ZXIvc3R5bGUvY3NzXCIsXHJcbiAgICAgICAgXCJlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9lbXB0eS9zdHlsZS9jc3NcIixcclxuICAgICAgXSxcclxuICAgIH0sXHJcbiAgICAvLyBcdTY3ODRcdTVFRkFcdTkxNERcdTdGNkVcclxuICAgIGJ1aWxkOiB7XHJcbiAgICAgIGNodW5rU2l6ZVdhcm5pbmdMaW1pdDogMjAwMCwgLy8gXHU2RDg4XHU5NjY0XHU2MjUzXHU1MzA1XHU1OTI3XHU1QzBGXHU4RDg1XHU4RkM3NTAwa2JcdThCNjZcdTU0NEFcclxuICAgICAgbWluaWZ5OiBcInRlcnNlclwiLCAvLyBWaXRlIDIuNi54IFx1NEVFNVx1NEUwQVx1OTcwMFx1ODk4MVx1OTE0RFx1N0Y2RSBtaW5pZnk6IFwidGVyc2VyXCIsIHRlcnNlck9wdGlvbnMgXHU2MjREXHU4MEZEXHU3NTFGXHU2NTQ4XHJcbiAgICAgIHRlcnNlck9wdGlvbnM6IHtcclxuICAgICAgICBjb21wcmVzczoge1xyXG4gICAgICAgICAga2VlcF9pbmZpbml0eTogdHJ1ZSwgLy8gXHU5NjMyXHU2QjYyIEluZmluaXR5IFx1ODhBQlx1NTM4Qlx1N0YyOVx1NjIxMCAxLzBcdUZGMENcdThGRDlcdTUzRUZcdTgwRkRcdTRGMUFcdTVCRkNcdTgxRjQgQ2hyb21lIFx1NEUwQVx1NzY4NFx1NjAyN1x1ODBGRFx1OTVFRVx1OTg5OFxyXG4gICAgICAgICAgZHJvcF9jb25zb2xlOiBmYWxzZSwgLy8gXHU3NTFGXHU0RUE3XHU3M0FGXHU1ODgzXHU1M0JCXHU5NjY0IGNvbnNvbGVcclxuICAgICAgICAgIGRyb3BfZGVidWdnZXI6IHRydWUsIC8vIFx1NzUxRlx1NEVBN1x1NzNBRlx1NTg4M1x1NTNCQlx1OTY2NCBkZWJ1Z2dlclxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZm9ybWF0OiB7XHJcbiAgICAgICAgICBjb21tZW50czogZmFsc2UsIC8vIFx1NTIyMFx1OTY2NFx1NkNFOFx1OTFDQVxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgICBvdXRwdXQ6IHtcclxuICAgICAgICAgIC8vIG1hbnVhbENodW5rczoge1xyXG4gICAgICAgICAgLy8gICBcInZ1ZS1pMThuXCI6IFtcInZ1ZS1pMThuXCJdLFxyXG4gICAgICAgICAgLy8gfSxcclxuICAgICAgICAgIC8vIFx1NzUyOFx1NEU4RVx1NEVDRVx1NTE2NVx1NTNFM1x1NzBCOVx1NTIxQlx1NUVGQVx1NzY4NFx1NTc1N1x1NzY4NFx1NjI1M1x1NTMwNVx1OEY5M1x1NTFGQVx1NjgzQ1x1NUYwRltuYW1lXVx1ODg2OFx1NzkzQVx1NjU4N1x1NEVGNlx1NTQwRCxbaGFzaF1cdTg4NjhcdTc5M0FcdThCRTVcdTY1ODdcdTRFRjZcdTUxODVcdTVCQjloYXNoXHU1MDNDXHJcbiAgICAgICAgICBlbnRyeUZpbGVOYW1lczogXCJqcy9bbmFtZV0uW2hhc2hdLmpzXCIsXHJcbiAgICAgICAgICAvLyBcdTc1MjhcdTRFOEVcdTU0N0RcdTU0MERcdTRFRTNcdTc4MDFcdTYyQzZcdTUyMDZcdTY1RjZcdTUyMUJcdTVFRkFcdTc2ODRcdTUxNzFcdTRFQUJcdTU3NTdcdTc2ODRcdThGOTNcdTUxRkFcdTU0N0RcdTU0MERcclxuICAgICAgICAgIGNodW5rRmlsZU5hbWVzOiBcImpzL1tuYW1lXS5baGFzaF0uanNcIixcclxuICAgICAgICAgIC8vIFx1NzUyOFx1NEU4RVx1OEY5M1x1NTFGQVx1OTc1OVx1NjAwMVx1OEQ0NFx1NkU5MFx1NzY4NFx1NTQ3RFx1NTQwRFx1RkYwQ1tleHRdXHU4ODY4XHU3OTNBXHU2NTg3XHU0RUY2XHU2MjY5XHU1QzU1XHU1NDBEXHJcbiAgICAgICAgICBhc3NldEZpbGVOYW1lczogKGFzc2V0SW5mbzogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGluZm8gPSBhc3NldEluZm8ubmFtZS5zcGxpdChcIi5cIik7XHJcbiAgICAgICAgICAgIGxldCBleHRUeXBlID0gaW5mb1tpbmZvLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnXHU2NTg3XHU0RUY2XHU0RkUxXHU2MDZGJywgYXNzZXRJbmZvLm5hbWUpXHJcbiAgICAgICAgICAgIGlmICgvXFwuKG1wNHx3ZWJtfG9nZ3xtcDN8d2F2fGZsYWN8YWFjKShcXD8uKik/JC9pLnRlc3QoYXNzZXRJbmZvLm5hbWUpKSB7XHJcbiAgICAgICAgICAgICAgZXh0VHlwZSA9IFwibWVkaWFcIjtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICgvXFwuKHBuZ3xqcGU/Z3xnaWZ8c3ZnKShcXD8uKik/JC8udGVzdChhc3NldEluZm8ubmFtZSkpIHtcclxuICAgICAgICAgICAgICBleHRUeXBlID0gXCJpbWdcIjtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICgvXFwuKHdvZmYyP3xlb3R8dHRmfG90ZikoXFw/LiopPyQvaS50ZXN0KGFzc2V0SW5mby5uYW1lKSkge1xyXG4gICAgICAgICAgICAgIGV4dFR5cGUgPSBcImZvbnRzXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGAke2V4dFR5cGV9L1tuYW1lXS5baGFzaF0uW2V4dF1gO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIGRlZmluZToge1xyXG4gICAgICBfX0FQUF9JTkZPX186IEpTT04uc3RyaW5naWZ5KF9fQVBQX0lORk9fXyksXHJcbiAgICB9LFxyXG4gIH07XHJcbn0pO1xyXG4iLCAie1xyXG4gIFwibmFtZVwiOiBcInZ1ZTMtZWxlbWVudC1hZG1pblwiLFxyXG4gIFwidmVyc2lvblwiOiBcIjIuMTkuMVwiLFxyXG4gIFwicHJpdmF0ZVwiOiB0cnVlLFxyXG4gIFwidHlwZVwiOiBcIm1vZHVsZVwiLFxyXG4gIFwic2NyaXB0c1wiOiB7XHJcbiAgICBcImRldlwiOiBcInZpdGVcIixcclxuICAgIFwiYnVpbGRcIjogXCJ2dWUtdHNjIC0tbm9FbWl0ICYgdml0ZSBidWlsZFwiLFxyXG4gICAgXCJwcmV2aWV3XCI6IFwidml0ZSBwcmV2aWV3XCIsXHJcbiAgICBcImJ1aWxkLW9ubHlcIjogXCJ2aXRlIGJ1aWxkXCIsXHJcbiAgICBcInR5cGUtY2hlY2tcIjogXCJ2dWUtdHNjIC0tbm9FbWl0XCIsXHJcbiAgICBcImxpbnQ6ZXNsaW50XCI6IFwiZXNsaW50IC0tZml4IC4vc3JjXCIsXHJcbiAgICBcImxpbnQ6cHJldHRpZXJcIjogXCJwcmV0dGllciAtLXdyaXRlIFxcXCIqKi8qLntqcyxjanMsdHMsanNvbix0c3gsY3NzLGxlc3Msc2Nzcyx2dWUsaHRtbCxtZH1cXFwiXCIsXHJcbiAgICBcImxpbnQ6c3R5bGVsaW50XCI6IFwic3R5bGVsaW50ICBcXFwiKiovKi57Y3NzLHNjc3MsdnVlfVxcXCIgLS1maXhcIixcclxuICAgIFwibGludDpsaW50LXN0YWdlZFwiOiBcImxpbnQtc3RhZ2VkXCIsXHJcbiAgICBcInByZWluc3RhbGxcIjogXCJucHggb25seS1hbGxvdyBwbnBtXCIsXHJcbiAgICBcInByZXBhcmVcIjogXCJodXNreVwiLFxyXG4gICAgXCJjb21taXRcIjogXCJnaXQtY3pcIlxyXG4gIH0sXHJcbiAgXCJjb25maWdcIjoge1xyXG4gICAgXCJjb21taXRpemVuXCI6IHtcclxuICAgICAgXCJwYXRoXCI6IFwibm9kZV9tb2R1bGVzL2N6LWdpdFwiXHJcbiAgICB9XHJcbiAgfSxcclxuICBcImxpbnQtc3RhZ2VkXCI6IHtcclxuICAgIFwiKi57anMsdHN9XCI6IFtcclxuICAgICAgXCJlc2xpbnQgLS1maXhcIixcclxuICAgICAgXCJwcmV0dGllciAtLXdyaXRlXCJcclxuICAgIF0sXHJcbiAgICBcIioue2Nqcyxqc29ufVwiOiBbXHJcbiAgICAgIFwicHJldHRpZXIgLS13cml0ZVwiXHJcbiAgICBdLFxyXG4gICAgXCIqLnt2dWUsaHRtbH1cIjogW1xyXG4gICAgICBcImVzbGludCAtLWZpeFwiLFxyXG4gICAgICBcInByZXR0aWVyIC0td3JpdGVcIixcclxuICAgICAgXCJzdHlsZWxpbnQgLS1maXhcIlxyXG4gICAgXSxcclxuICAgIFwiKi57c2Nzcyxjc3N9XCI6IFtcclxuICAgICAgXCJzdHlsZWxpbnQgLS1maXhcIixcclxuICAgICAgXCJwcmV0dGllciAtLXdyaXRlXCJcclxuICAgIF0sXHJcbiAgICBcIioubWRcIjogW1xyXG4gICAgICBcInByZXR0aWVyIC0td3JpdGVcIlxyXG4gICAgXVxyXG4gIH0sXHJcbiAgXCJkZXBlbmRlbmNpZXNcIjoge1xyXG4gICAgXCJAZWxlbWVudC1wbHVzL2ljb25zLXZ1ZVwiOiBcIl4yLjMuMVwiLFxyXG4gICAgXCJAc3RvbXAvc3RvbXBqc1wiOiBcIl43LjAuMFwiLFxyXG4gICAgXCJAdnVldXNlL2NvcmVcIjogXCJeMTAuMTEuMVwiLFxyXG4gICAgXCJAd2FuZ2VkaXRvci9lZGl0b3JcIjogXCJeNS4xLjIzXCIsXHJcbiAgICBcIkB3YW5nZWRpdG9yL2VkaXRvci1mb3ItdnVlXCI6IFwiNS4xLjEwXCIsXHJcbiAgICBcImFuaW1hdGUuY3NzXCI6IFwiXjQuMS4xXCIsXHJcbiAgICBcImF4aW9zXCI6IFwiXjEuNy43XCIsXHJcbiAgICBcImNvZGVtaXJyb3JcIjogXCJeNS42NS4xOFwiLFxyXG4gICAgXCJjb2RlbWlycm9yLWVkaXRvci12dWUzXCI6IFwiXjIuOC4wXCIsXHJcbiAgICBcImVjaGFydHNcIjogXCJeNS41LjFcIixcclxuICAgIFwiZWxlbWVudC1wbHVzXCI6IFwiXjIuOC43XCIsXHJcbiAgICBcImV4Y2VsanNcIjogXCJeNC40LjBcIixcclxuICAgIFwibG9kYXNoLWVzXCI6IFwiXjQuMTcuMjFcIixcclxuICAgIFwibnByb2dyZXNzXCI6IFwiXjAuMi4wXCIsXHJcbiAgICBcInBhdGgtYnJvd3NlcmlmeVwiOiBcIl4xLjAuMVwiLFxyXG4gICAgXCJwYXRoLXRvLXJlZ2V4cFwiOiBcIl42LjMuMFwiLFxyXG4gICAgXCJwaW5pYVwiOiBcIl4yLjIuNlwiLFxyXG4gICAgXCJxc1wiOiBcIl42LjEzLjBcIixcclxuICAgIFwic29ydGFibGVqc1wiOiBcIl4xLjE1LjNcIixcclxuICAgIFwidnVlXCI6IFwiXjMuNS4xMlwiLFxyXG4gICAgXCJ2dWUtaTE4blwiOiBcIjkuOS4xXCIsXHJcbiAgICBcInZ1ZS1yb3V0ZXJcIjogXCJeNC40LjVcIlxyXG4gIH0sXHJcbiAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xyXG4gICAgXCJAY29tbWl0bGludC9jbGlcIjogXCJeMTkuNS4wXCIsXHJcbiAgICBcIkBjb21taXRsaW50L2NvbmZpZy1jb252ZW50aW9uYWxcIjogXCJeMTkuNS4wXCIsXHJcbiAgICBcIkBlc2xpbnQvanNcIjogXCJeOS4xNC4wXCIsXHJcbiAgICBcIkB0eXBlcy9jb2RlbWlycm9yXCI6IFwiXjUuNjAuMTVcIixcclxuICAgIFwiQHR5cGVzL2xvZGFzaFwiOiBcIl40LjE3LjEzXCIsXHJcbiAgICBcIkB0eXBlcy9ub2RlXCI6IFwiXjIyLjkuMFwiLFxyXG4gICAgXCJAdHlwZXMvbnByb2dyZXNzXCI6IFwiXjAuMi4zXCIsXHJcbiAgICBcIkB0eXBlcy9wYXRoLWJyb3dzZXJpZnlcIjogXCJeMS4wLjNcIixcclxuICAgIFwiQHR5cGVzL3FzXCI6IFwiXjYuOS4xN1wiLFxyXG4gICAgXCJAdHlwZXMvc29ydGFibGVqc1wiOiBcIl4xLjE1LjhcIixcclxuICAgIFwiQHR5cGVzY3JpcHQtZXNsaW50L2VzbGludC1wbHVnaW5cIjogXCJeOC4xNC4wXCIsXHJcbiAgICBcIkB0eXBlc2NyaXB0LWVzbGludC9wYXJzZXJcIjogXCJeOC4xNC4wXCIsXHJcbiAgICBcIkB2aXRlanMvcGx1Z2luLXZ1ZVwiOiBcIl41LjEuNVwiLFxyXG4gICAgXCJhdXRvcHJlZml4ZXJcIjogXCJeMTAuNC4yMFwiLFxyXG4gICAgXCJjb21taXRpemVuXCI6IFwiXjQuMy4xXCIsXHJcbiAgICBcImN6LWdpdFwiOiBcIjEuOS40XCIsXHJcbiAgICBcImVzbGludFwiOiBcIl45LjE0LjBcIixcclxuICAgIFwiZXNsaW50LWNvbmZpZy1wcmV0dGllclwiOiBcIl45LjEuMFwiLFxyXG4gICAgXCJlc2xpbnQtcGx1Z2luLXByZXR0aWVyXCI6IFwiXjUuMi4xXCIsXHJcbiAgICBcImVzbGludC1wbHVnaW4tdnVlXCI6IFwiXjkuMzEuMFwiLFxyXG4gICAgXCJnbG9iYWxzXCI6IFwiXjE1LjEyLjBcIixcclxuICAgIFwiaHVza3lcIjogXCJeOS4xLjZcIixcclxuICAgIFwibGludC1zdGFnZWRcIjogXCJeMTUuMi4xMFwiLFxyXG4gICAgXCJwb3N0Y3NzXCI6IFwiXjguNC40OVwiLFxyXG4gICAgXCJwb3N0Y3NzLWh0bWxcIjogXCJeMS43LjBcIixcclxuICAgIFwicG9zdGNzcy1zY3NzXCI6IFwiXjQuMC45XCIsXHJcbiAgICBcInByZXR0aWVyXCI6IFwiXjMuMy4zXCIsXHJcbiAgICBcInNhc3NcIjogXCJeMS44MC42XCIsXHJcbiAgICBcInN0eWxlbGludFwiOiBcIl4xNi4xMC4wXCIsXHJcbiAgICBcInN0eWxlbGludC1jb25maWctaHRtbFwiOiBcIl4xLjEuMFwiLFxyXG4gICAgXCJzdHlsZWxpbnQtY29uZmlnLXJlY2Vzcy1vcmRlclwiOiBcIl41LjEuMVwiLFxyXG4gICAgXCJzdHlsZWxpbnQtY29uZmlnLXJlY29tbWVuZGVkLXNjc3NcIjogXCJeMTQuMS4wXCIsXHJcbiAgICBcInN0eWxlbGludC1jb25maWctcmVjb21tZW5kZWQtdnVlXCI6IFwiXjEuNS4wXCIsXHJcbiAgICBcInN0eWxlbGludC1jb25maWctc3RhbmRhcmRcIjogXCJeMzYuMC4xXCIsXHJcbiAgICBcInRlcnNlclwiOiBcIl41LjM2LjBcIixcclxuICAgIFwidHlwZXNjcmlwdFwiOiBcIjUuNS40XCIsXHJcbiAgICBcInR5cGVzY3JpcHQtZXNsaW50XCI6IFwiXjguMTQuMFwiLFxyXG4gICAgXCJ1bm9jc3NcIjogXCJeMC42My42XCIsXHJcbiAgICBcInVucGx1Z2luLWF1dG8taW1wb3J0XCI6IFwiXjAuMTguM1wiLFxyXG4gICAgXCJ1bnBsdWdpbi12dWUtY29tcG9uZW50c1wiOiBcIl4wLjI3LjRcIixcclxuICAgIFwidml0ZVwiOiBcIl41LjQuMTFcIixcclxuICAgIFwidml0ZS1wbHVnaW4tbW9jay1kZXYtc2VydmVyXCI6IFwiXjEuOC4wXCIsXHJcbiAgICBcInZpdGUtcGx1Z2luLXN2Zy1pY29uc1wiOiBcIl4yLjAuMVwiLFxyXG4gICAgXCJ2dWUtZXNsaW50LXBhcnNlclwiOiBcIl45LjQuM1wiLFxyXG4gICAgXCJ2dWUtdHNjXCI6IFwiXjIuMS4xMFwiXHJcbiAgfSxcclxuICBcImVuZ2luZXNcIjoge1xyXG4gICAgXCJub2RlXCI6IFwiPj0xOC4wLjBcIlxyXG4gIH0sXHJcbiAgXCJyZXBvc2l0b3J5XCI6IFwiaHR0cHM6Ly9naXRlZS5jb20veW91bGFpb3JnL3Z1ZTMtZWxlbWVudC1hZG1pbi5naXRcIixcclxuICBcImF1dGhvclwiOiBcIlx1NjcwOVx1Njc2NVx1NUYwMFx1NkU5MFx1N0VDNFx1N0VDN1wiLFxyXG4gIFwibGljZW5zZVwiOiBcIk1JVFwiXHJcbn1cclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFpUixPQUFPLFNBQVM7QUFDalMsU0FBMEMsU0FBUyxvQkFBb0I7QUFFdkUsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxnQkFBZ0I7QUFDdkIsU0FBUywyQkFBMkI7QUFFcEMsU0FBUyw0QkFBNEI7QUFDckMsT0FBTyx5QkFBeUI7QUFFaEMsT0FBTyxZQUFZO0FBQ25CLFNBQVMsZUFBZTs7O0FDVnRCLFdBQVE7QUFDUixjQUFXO0FBMkNYLG1CQUFnQjtBQUFBLEVBQ2QsMkJBQTJCO0FBQUEsRUFDM0Isa0JBQWtCO0FBQUEsRUFDbEIsZ0JBQWdCO0FBQUEsRUFDaEIsc0JBQXNCO0FBQUEsRUFDdEIsOEJBQThCO0FBQUEsRUFDOUIsZUFBZTtBQUFBLEVBQ2YsT0FBUztBQUFBLEVBQ1QsWUFBYztBQUFBLEVBQ2QsMEJBQTBCO0FBQUEsRUFDMUIsU0FBVztBQUFBLEVBQ1gsZ0JBQWdCO0FBQUEsRUFDaEIsU0FBVztBQUFBLEVBQ1gsYUFBYTtBQUFBLEVBQ2IsV0FBYTtBQUFBLEVBQ2IsbUJBQW1CO0FBQUEsRUFDbkIsa0JBQWtCO0FBQUEsRUFDbEIsT0FBUztBQUFBLEVBQ1QsSUFBTTtBQUFBLEVBQ04sWUFBYztBQUFB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QUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQTtBQUFBLElBRUEsT0FBTztBQUFBLE1BQ0wsdUJBQXVCO0FBQUE7QUFBQSxNQUN2QixRQUFRO0FBQUE7QUFBQSxNQUNSLGVBQWU7QUFBQSxRQUNiLFVBQVU7QUFBQSxVQUNSLGVBQWU7QUFBQTtBQUFBLFVBQ2YsY0FBYztBQUFBO0FBQUEsVUFDZCxlQUFlO0FBQUE7QUFBQSxRQUNqQjtBQUFBLFFBQ0EsUUFBUTtBQUFBLFVBQ04sVUFBVTtBQUFBO0FBQUEsUUFDWjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLGVBQWU7QUFBQSxRQUNiLFFBQVE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFVBS04sZ0JBQWdCO0FBQUE7QUFBQSxVQUVoQixnQkFBZ0I7QUFBQTtBQUFBLFVBRWhCLGdCQUFnQixDQUFDLGNBQW1CO0FBQ2xDLGtCQUFNLE9BQU8sVUFBVSxLQUFLLE1BQU0sR0FBRztBQUNyQyxnQkFBSSxVQUFVLEtBQUssS0FBSyxTQUFTLENBQUM7QUFFbEMsZ0JBQUksNkNBQTZDLEtBQUssVUFBVSxJQUFJLEdBQUc7QUFDckUsd0JBQVU7QUFBQSxZQUNaLFdBQVcsZ0NBQWdDLEtBQUssVUFBVSxJQUFJLEdBQUc7QUFDL0Qsd0JBQVU7QUFBQSxZQUNaLFdBQVcsa0NBQWtDLEtBQUssVUFBVSxJQUFJLEdBQUc7QUFDakUsd0JBQVU7QUFBQSxZQUNaO0FBQ0EsbUJBQU8sR0FBRyxPQUFPO0FBQUEsVUFDbkI7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLFFBQVE7QUFBQSxNQUNOLGNBQWMsS0FBSyxVQUFVLFlBQVk7QUFBQSxJQUMzQztBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
