import request from "@/utils/request";

const AUTH_BASE_URL = "/api/course";
const CourseAPI = {
  // 添加星座
  addCourse(data: any) {
    return request({
      url: `${AUTH_BASE_URL}/add`,
      method: "post",
      data: data,
    });
  },
  getCourse(params: any) {
    return request({
      url: `${AUTH_BASE_URL}/list`,
      method: "get",
      params: params,
    });
  },
};

export default CourseAPI;
