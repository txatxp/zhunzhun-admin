<template>
  <div class="article">
    <el-button type="primary" @click="addArticle">添加文章</el-button>
    <el-select
      v-model="queryParams.keywords"
      placeholder="请选择分类"
      style="width: 240px; margin-left: 10px"
      @change="handleArticleTypeChange"
    >
      <el-option
        v-for="item in articleTypeOptions"
        :key="item.id"
        :label="item.type + '-----' + item.name"
        :value="item.type"
      />
    </el-select>
    <el-divider />
    <el-table :data="tableData" border show-overflow-tooltip>
      <el-table-column prop="id" label="ID" width="50" />
      <el-table-column prop="type" label="分类" width="150" />
      <el-table-column prop="name" label="分类名字" width="260" />
      <el-table-column prop="text" label="内容" />
      <el-table-column prop="createTime" label="创建时间" width="260" />
      <el-table-column prop="updateTime" label="最后更新时间" width="260" />
      <el-table-column label="查看" width="150">
        <template #default="scope">
          <el-button type="text" @click="handleView(scope.row)">查看</el-button>
          <el-button type="text" @click="handleEdit(scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-if="total > 0"
      v-model:total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="handleQuery"
    />

    <el-dialog v-model="dialogVisible" title="文章内容" :append-to-body="true">
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
import ArticleAPI from "@/api/article";
const tableData = ref<any>([]);
const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  keywords: "",
});
const total = ref(0);
const dialogVisible = ref(false);
const content = ref("");
const handleView = (row: any) => {
  dialogVisible.value = true;
  content.value = row.text;
};

const handleQuery = () => {
  ArticleAPI.getArticle(queryParams).then((res: any) => {
    if (res.code === 200) {
      tableData.value = res.list;
      total.value = res.total;
    }
  });
};
const articleTypeOptions = ref<any>([]);
onMounted(() => {
  handleQuery();
  ArticleAPI.getArticleType().then((res: any) => {
    if (res && res.length) {
      articleTypeOptions.value = res;
    }
  });
});
const handleArticleTypeChange = (val: any) => {
  queryParams.keywords = val;
  handleQuery();
};
const router = useRouter();
const addArticle = () => {
  router.push({ path: "/article/add" });
};
const handleEdit = (row: any) => {
  router.push({ path: "/article/edit", query: { id: row.id } });
};
</script>
<style lang="scss" scoped>
.article {
  padding: 20px;
  background-color: #fff;
}
</style>
