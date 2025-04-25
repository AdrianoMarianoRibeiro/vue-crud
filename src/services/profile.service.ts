import { IProfile } from "@/types/profile";
import { DefaultService } from "./default.service";

export abstract class ProfileService {
  static create(body: IProfile) {
    return DefaultService.create("/profile", body);
  }

  static update(id: string, body: IProfile) {
    return DefaultService.update(`/profile/${id}`, body);
  }

  static delete(id: string) {
    return DefaultService.delete(`/profile/${id}`);
  }

  static findAll(page = 1, take = 10) {
    return DefaultService.findAll("/profile", page, take);
  }

  static findById(id: string) {
    return DefaultService.findById(`/profile/${id}`);
  }
}
