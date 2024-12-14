<template>
  <div class="article">
    <el-form
      :model="form"
      label-width="auto"
      style="width: 100%"
      :rules="rules"
      ref="articleTypeAddRef"
    >
      <el-form-item label="分类" prop="type">
        <el-select
          v-model="form.type"
          placeholder="请选择分类"
          style="width: 300px"
          @change="handleArticleTypeChange"
        >
          <el-option
            v-for="item in articleTypeOptions"
            :key="item.id"
            :label="item.type + '-----' + item.name"
            :value="item.type"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="分类名称" prop="name">
        <el-input v-model="form.name" :disabled="true" placeholder="分类名称" />
      </el-form-item>
      <el-form-item label="文章标题" prop="name">
        <el-input v-model="form.title" placeholder="文章标题" />
      </el-form-item>
      <el-form-item label="文章内容" style="width: 100%">
        <div style="border: 1px solid #ccc">
          <Toolbar
            style="border-bottom: 1px solid #ccc"
            :editor="editorRef"
            :defaultConfig="toolbarConfig"
            :mode="mode"
          />
          <Editor
            style="height: 1000px; overflow-y: hidden"
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
import ArticleAPI from "@/api/article";
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();
const form = ref<any>({
  type: "",
  name: "",
  title: "",
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

const articleTypeOptions = ref<any>([]);

const router = useRouter();

const submit = async (formEl: any) => {
  await formEl.validate((valid: any, fields: any) => {
    if (valid) {
      if (!valueHtml.value) {
        ElMessage.error("请输入文章内容");
        return;
      }
      form.value.text = valueHtml.value;
      ArticleAPI.addArticle(form.value).then((res: any) => {
        if (res.code == 200) {
          ElMessage.success("添加成功");
          router.push({ path: "/article/list" });
        } else {
          ElMessage.error(res.msg);
        }
      });
    }
  });
};
//  文章类型改变
const handleArticleTypeChange = (val: any) => {
  const data = articleTypeOptions.value.filter((item) => item.type === val);
  if (data.length > 0) {
    form.value.name = data[0].name;
  }
  console.log(data);
};

const rules = reactive({
  name: [{ required: true, message: "请填写分类名称", trigger: "change" }],
  title: [{ required: true, message: "请填写文章标题", trigger: "change" }],
  articleType: [
    {
      required: true,
      message: "请填写分类，尽量以英文名称",
      trigger: "change",
    },
  ],
});
onMounted(() => {
  ArticleAPI.getArticleType().then((res: any) => {
    if (res && res.length) {
      articleTypeOptions.value = res;
      form.value.type = res[0].type;
      form.value.name = res[0].name;
    }
  });
});
</script>
<style lang="scss" scoped>
.article {
  padding: 20px;
  background-color: #fff;
}
</style>
