<template>
  <div class="article">
    <el-form
      :model="form"
      label-width="auto"
      style="width: 100%"
      :rules="rules"
      ref="articleTypeAddRef"
    >
      <el-form-item label="星座名称" prop="name">
        <el-select v-model="form.name" placeholder="请选择分类" style="width: 300px">
          <el-option label="白羊座" value="Aries" />
          <el-option label="金牛座" value="Taurus" />
          <el-option label="双子座" value="Gemini" />
          <el-option label="巨蟹座" value="Cancer" />
          <el-option label="狮子座" value="Leo" />
          <el-option label="处女座" value="Virgo" />
          <el-option label="天秤座" value="Libra" />
          <el-option label="天蝎座" value="Scorpio" />
          <el-option label="射手座" value="Sagittarius" />
          <el-option label="摩羯座" value="Capricorn" />
          <el-option label="水瓶座" value="Aquarius" />
          <el-option label="双鱼座" value="Pisces" />
        </el-select>
      </el-form-item>

      <el-form-item label="星座图片地址" prop="img">
        <el-input v-model="form.img" placeholder="请输入星座图片地址" />
      </el-form-item>
      <el-form-item label="星座描述" prop="description">
        <el-input
          v-model="form.description"
          placeholder="请输入星座描述"
          :rows="3"
          type="textarea"
        />
      </el-form-item>
      <el-form-item label="配对星座" prop="astro">
        <el-input v-model="form.astro" placeholder="请输入配对星座" />
      </el-form-item>
      <el-form-item label="星座特点" style="width: 100%">
        <div style="border: 1px solid #ccc">
          <Toolbar
            style="border-bottom: 1px solid #ccc"
            :editor="editorRef"
            :defaultConfig="toolbarConfig"
            :mode="mode"
          />
          <Editor
            style="height: 600px; overflow-y: hidden"
            v-model="valueHtml"
            :defaultConfig="editorConfig"
            :mode="mode"
            @onCreated="handleCreated"
            @onChange="handleChange"
            @onDestroyed="handleDestroyed"
            @onFocus="handleFocus"
            @onBlur="handleBlur"
            @customAlert="customAlert"
            @customPaste="customPaste"
          />
        </div>
      </el-form-item>
      <el-form-item label=" ">
        <el-button type="primary" @click="submit(articleTypeAddRef)">保存文章</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import AstroApi from "@/api/astro";
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { useTagsViewStore } from "@/store";
const tagsViewStore = useTagsViewStore();
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();
const form = ref<any>({
  name: "Aries",
  img: "",
  description: "",
  astro: "",
});
// 内容 HTML
const valueHtml = ref("");
const toolbarConfig = {};
const editorConfig = { placeholder: "请输入内容..." };
const mode = ref("default");
// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});
const handleCreated = (editor: any) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};
const handleChange = (editor: any) => {
  console.log("change:", editor.children);
};
const handleDestroyed = (editor: any) => {
  console.log("destroyed", editor);
};
const handleFocus = (editor: any) => {
  console.log("focus", editor);
};
const handleBlur = (editor: any) => {
  console.log("blur", editor);
};
const customAlert = (info: any, type: any) => {
  alert(`【自定义提示】${type} - ${info}`);
};
const customPaste = (editor: any, event: any, callback: any) => {
  console.log("ClipboardEvent 粘贴事件对象", event);
  // const html = event.clipboardData.getData("text/html"); // 获取粘贴的 html
  const text = event.clipboardData.getData("text/plain"); // 获取粘贴的纯文本
  // const rtf = event.clipboardData.getData("text/rtf"); // 获取 rtf 数据（如从 word wsp 复制粘贴）

  // 自定义插入内容
  editor.insertText(text);

  // 返回 false ，阻止默认粘贴行为
  event.preventDefault();
  callback(false); // 返回值（注意，vue 事件的返回值，不能用 return）

  // 返回 true ，继续默认的粘贴行为
  // callback(true)
};

const articleTypeAddRef = ref<any>(null);

const router = useRouter();
const route = useRoute();

const submit = async (formEl: any) => {
  await formEl.validate((valid: any, fields: any) => {
    if (valid) {
      if (!valueHtml.value) {
        ElMessage.error("请输入文章内容");
        return;
      }
      form.value.peculiarity = valueHtml.value;
      AstroApi.updateAstro(form.value).then((res: any) => {
        if (res.code == 200) {
          tagsViewStore.closeCurrentView();
          ElMessage.success("更新成功");
          router.push({ path: "/astro/index" });
        } else {
          ElMessage.error(res.msg);
        }
      });
    }
  });
};

const rules = reactive({
  name: [{ required: true, message: "请填写星座名称", trigger: "change" }],
  img: [{ required: true, message: "请填写星座图片链接", trigger: "change" }],
  description: [{ required: true, message: "请填写星座描述", trigger: "change" }],
  astro: [{ required: true, message: "请填写星座配对", trigger: "change" }],
});

onMounted(() => {
  if (route.query.id) {
    form.value.id = route.query.id;
    AstroApi.getAstroDetail(Number(route.query.id)).then((res: any) => {
      if (res.code == 200) {
        form.value.name = res.list.name;
        form.value.img = res.list.img;
        form.value.description = res.list.description;
        form.value.astro = res.list.astro;
        valueHtml.value = res.list.peculiarity;
      } else {
        ElMessage.error(res.msg);
      }
    });
  }
});
</script>
<style lang="scss" scoped>
.article {
  padding: 20px;
  background-color: #fff;
}
</style>
