import { IUser } from "@/types/user";
import { DefaultService } from "./default.service";

export abstract class UserService {
  static create(body: IUser) {
    return DefaultService.create("/user", body);
  }

  static update(id: string, body: IUser) {
    return DefaultService.create(`/user/${id}`, body);
  }

  static delete(id: string) {
    return DefaultService.delete(`/user/${id}`);
  }

  static findAll(page = 1, take = 10) {
    return DefaultService.findAll("/user", page, take);
  }

  static findById(id: string) {
    return DefaultService.findById(`/user/${id}`);
  }
}
