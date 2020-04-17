import http from "../http-common";

class RoutesDataService {
  
  getAll() {
    return http.post("/routes");
  }

  getById(id) {
    return http.get(`/routes/${id}`);
  }

  add(data) {
    return http.post("/routes", data);
  }

  update(id, data) {
    return http.put(`/routes/${id}`, data);
  }

  del(id) {
    return http.delete(`/routes/${id}`);
  }
}

export default new RoutesDataService();