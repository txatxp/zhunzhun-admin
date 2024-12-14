<template>
  <div class="article">
    <el-form
      :model="form"
      label-width="auto"
      style="width: 100%"
      :rules="rules"
      ref="articleTypeAddRef"
    >
      <el-form-item label="课程名称" prop="title">
        <el-input v-model="form.title" placeholder="请输入课程名称" />
      </el-form-item>
      <el-form-item label="课程地址试听" prop="src">
        <el-input v-model="form.src" placeholder="请输入课程地址" />
      </el-form-item>
      <el-form-item label="课程分类" prop="type">
        <el-select v-model="form.type" placeholder="请选择分类" style="width: 300px">
          <el-option label="1" value="1" />
          <el-option label="2" value="2" />
          <el-option label="3" value="3" />
          <el-option label="4" value="4" />
          <el-option label="5" value="5" />
        </el-select>
      </el-form-item>
      <el-form-item label="是否试听" prop="audition">
        <el-select v-model="form.audition" placeholder="是否试听" style="width: 300px">
          <el-option label="是" :value="1" />
          <el-option label="否" :value="0" />
        </el-select>
      </el-form-item>

      <el-form-item label=" ">
        <el-button type="primary" @click="submit(articleTypeAddRef)">保存课程</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import CourseApi from "@/api/course";
const form = ref<any>({
  title: "",
  src: "",
  audition: "",
  type: "",
});

const articleTypeAddRef = ref<any>(null);

const router = useRouter();

const submit = async (formEl: any) => {
  await formEl.validate((valid: any, fields: any) => {
    if (valid) {
      CourseApi.addCourse(form.value).then((res: any) => {
        if (res.code == 200) {
          ElMessage.success("添加成功");
          router.push({ path: "/course/index" });
        } else {
          ElMessage.error(res.msg);
        }
      });
    }
  });
};

const rules = reactive({
  title: [{ required: true, message: "请填写课程名称", trigger: "change" }],
  audition: [{ required: true, message: "请填写是否试听", trigger: "change" }],
  type: [{ required: true, message: "请填写分类", trigger: "change" }],
});
</script>
<style lang="scss" scoped>
.article {
  padding: 20px;
  background-color: #fff;
}
</style>
