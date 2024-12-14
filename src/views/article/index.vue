<template>
  <div class="article">
    <el-button type="primary" @click="dialogVisible = true">添加文章分类</el-button>
    <el-divider />
    <el-table :data="tableData" border style="width: 500px">
      <el-table-column prop="type" label="分类" />
      <el-table-column prop="name" label="分类名字" />
    </el-table>

    <el-dialog
      v-model="dialogVisible"
      title="文章分类添加"
      width="500"
      :before-close="handleClose"
      :append-to-body="true"
    >
      <el-form
        :model="form"
        label-width="auto"
        style="max-width: 600px"
        :rules="rules"
        ref="articleTypeAddRef"
      >
        <el-form-item label="分类" prop="type">
          <el-input v-model="form.type" />
        </el-form-item>
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submit(articleTypeAddRef)">保存</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import ArticleAPI from "@/api/article";
const dialogVisible = ref(false);
const articleTypeAddRef = ref<any>(null);
const tableData = ref<any>([]);
const handleClose = () => {
  dialogVisible.value = false;
};
const submit = async (formEl: any) => {
  await formEl.validate((valid: any, fields: any) => {
    if (valid) {
      ArticleAPI.addArticleType(form.value).then((res: any) => {
        console.log(res);
        if (res.code == 200) {
          ElMessage.success("添加成功");
          dialogVisible.value = false;
        } else {
          ElMessage.error(res.msg);
        }
      });
    }
  });
};
const form = ref({
  type: "",
  name: "",
});
const rules = reactive({
  name: [{ required: true, message: "请填写分类名称", trigger: "blur" }],
  type: [
    {
      required: true,
      message: "请填写分类，尽量以英文名称",
      trigger: "blur",
    },
  ],
});
onMounted(() => {
  ArticleAPI.getArticleType().then((res: any) => {
    if (res && res.length) {
      tableData.value = res;
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
