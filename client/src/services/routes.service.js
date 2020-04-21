import httpApi from "../http-common-api";

class RoutesDataService {
  
  getAll() {
    return httpApi.post("/routes");
  }

  add(data) {
    return httpApi.post("/routes/add", data);
  }

  update(data) {
    return httpApi.post(`/routes/upd`, data);
  }

  del(data) {
    return httpApi.post('/routes/del', data);
  }
}

export default new RoutesDataService();