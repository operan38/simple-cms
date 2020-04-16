import http from "../http-common";

class RoutesDataService {
  getAll() {
    return http.post("/routes");
  }

  get(id) {
    return http.get(`/routes/${id}`);
  }

  create(data) {
    return http.post("/routes", data);
  }

  update(id, data) {
    return http.put(`/routes/${id}`, data);
  }

  delete(id) {
    return http.delete(`/routes/${id}`);
  }

  deleteAll() {
    return http.delete(`/routes`);
  }

  /*findByTitle(title) {
    return http.get(`/routes?title=${title}`);
  }*/
}

export default new RoutesDataService();