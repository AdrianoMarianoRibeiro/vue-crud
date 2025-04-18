import api from "@/plugins/api";
import { User } from "@/types/user";

export class UserService {
  static async createUser(data: User) {
    const response = await api.post("/user", data);
    return response.data;
  }
}
