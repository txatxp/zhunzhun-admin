<template>
  <div class="article">
    <el-button type="primary" @click="addArticle">添加星座</el-button>
    <el-divider />
    <el-table :data="tableData" border show-overflow-tooltip>
      <el-table-column prop="id" label="ID" width="50" />
      <el-table-column prop="title" label="星座名字" width="260" />
      <el-table-column prop="name" label="星座英文字符" width="260" />
      <el-table-column prop="img" label="图片" width="260" align="center">
        <template #default="scope">
          <img :src="scope.row.img" width="100" height="100" />
        </template>
      </el-table-column>
      <el-table-column prop="date" label="星座生日" width="260" />
      <el-table-column prop="astro" label="配对星座" width="260" />
      <el-table-column prop="description" label="描述" width="260" />
      <el-table-column prop="peculiarity" label="特点" />
      <el-table-column label="查看" width="150">
        <template #default="scope">
          <el-button type="text" @click="handleView(scope.row)">查看</el-button>
          <el-button type="text" @click="handleEdit(scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogVisible" title="特点内容" :append-to-body="true">
      <div v-html="content" style="padding: 10px"></div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import AstroAPI from "@/api/astro";
const tableData = ref<any>([]);

const dialogVisible = ref(false);
const content = ref("");
const handleView = (row: any) => {
  dialogVisible.value = true;
  content.value = row.peculiarity;
};

const handleQuery = () => {
  AstroAPI.getAstro().then((res: any) => {
    tableData.value = res.list;
  });
};
onMounted(() => {
  handleQuery();
});

const router = useRouter();
const addArticle = () => {
  router.push({ path: "/astro/add" });
};
const handleEdit = (row: any) => {
  router.push({ path: "/astro/edit", query: { id: row.id } });
};
</script>
<style lang="scss" scoped>
.article {
  padding: 20px;
  background-color: #fff;
}
</style>
