<template>
  <div class="article">
    <el-button type="primary" @click="addCourse">添加课程</el-button>
    <el-input
      v-model="queryParams.keywords"
      placeholder="请输入课程名称"
      style="width: 300px; margin-left: 10px"
      @change="handleQuery"
    />
    <el-divider />
    <el-table :data="tableData" border show-overflow-tooltip>
      <el-table-column prop="id" label="ID" width="50" />
      <el-table-column prop="title" label="课程名称" width="260" />
      <el-table-column prop="src" label="课程试听地址" width="260" />
      <el-table-column prop="audition" label="是否试听" width="260"></el-table-column>
      <el-table-column label="查看" width="150">
        <template #default="scope">
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
  </div>
</template>
<script setup lang="ts">
import CourseAPI from "@/api/course";
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
  content.value = row.peculiarity;
};

const handleQuery = () => {
  CourseAPI.getCourse(queryParams).then((res: any) => {
    tableData.value = res.list;
    total.value = res.total;
  });
};
onMounted(() => {
  handleQuery();
});

const router = useRouter();
const addCourse = () => {
  router.push({ path: "/course/add" });
};
const handleEdit = (row: any) => {
  router.push({ path: "/course/edit", query: { id: row.id } });
};
</script>
<style lang="scss" scoped>
.article {
  padding: 20px;
  background-color: #fff;
}
</style>
