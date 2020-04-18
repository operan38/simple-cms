import http from "../http-common";

class RoutesDataService {
  
  getAll() {
    return http.post("/routes");
  }

  getById(id) {
    return http.get(`/routes/${id}`);
  }

  add(data) {
    return http.post("/routes/add", data);
  }

  update(id, data) {
    return http.put(`/routes/${id}`, data);
  }

  del(data) {
    return http.post('/routes/del', data);
  }
}

export default new RoutesDataService();