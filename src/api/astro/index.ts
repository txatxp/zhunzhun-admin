import request from "@/utils/request";

const AUTH_BASE_URL = "/api/astro";
const AstroAPI = {
  // 添加星座
  addAstro(data: any) {
    return request({
      url: `${AUTH_BASE_URL}/add`,
      method: "post",
      data: data,
    });
  },
  // 获取十二星座
  getAstro() {
    return request({
      url: `${AUTH_BASE_URL}/list`,
      method: "get",
    });
  },
  // 获取星座详情
  getAstroDetail(id: number) {
    return request({
      url: `${AUTH_BASE_URL}/${id}/form`,
      method: "get",
    });
  },
  // 更新星座
  updateAstro(data: any) {
    return request({
      url: `${AUTH_BASE_URL}/update`,
      method: "put",
      data: data,
    });
  },
};

export default AstroAPI;
