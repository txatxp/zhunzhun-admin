import request from "@/utils/request";

const AUTH_BASE_URL = "/api/article";
const ArticleAPI = {
  // 添加文章分类
  addArticleType(data: any) {
    return request({
      url: `${AUTH_BASE_URL}/type/add`,
      method: "post",
      data: data,
    });
  },
  // 获取文章分类
  getArticleType() {
    return request({
      url: `${AUTH_BASE_URL}/type/list`,
      method: "get",
    });
  },
  // 添加文章内容
  addArticle(data: any) {
    return request({
      url: `${AUTH_BASE_URL}/add`,
      method: "post",
      data: data,
    });
  },
  // 获取文章内容
  getArticle(data: any) {
    return request({
      url: `${AUTH_BASE_URL}/list`,
      method: "get",
      params: data,
    });
  },
  // 获取文章内容详情
  getArticleById(id: any) {
    return request({
      url: `${AUTH_BASE_URL}/${id}/detail`,
      method: "get",
    });
  },
  // 修改文章内容
  updateArticle(id: any, data: any) {
    return request({
      url: `${AUTH_BASE_URL}/${id}/put`,
      method: "put",
      data: data,
    });
  },
};

export default ArticleAPI;
