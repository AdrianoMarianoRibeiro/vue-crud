import api from "@/plugins/api";
import { User } from "@/types/user";

export class UserService {
  static async create(data: User) {
    const response = await api.post("/user", data);
    return response.data;
  }

  static async update(id: string, body: User) {
    const response = await api.put(`/user/${id}`, body);
    return response.data;
  }

  static async delete(id: string) {
    const response = await api.delete(`/user/${id}`);
    return response.data;
  }

  static async findAll(page = 1, take = 10) {
    const response = await api.get("/user", {
      params: { page, take },
    });
    return response.data;
  }

  static async findById(id: string) {
    const response = await api.get(`/user/${id}`);
    return response.data;
  }
}
