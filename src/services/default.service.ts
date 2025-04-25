import api from "@/plugins/api";

export abstract class DefaultService {
  static async create(uri: string, data: object) {
    const response = await api.post(uri, data);
    return response.data;
  }

  static async update(uri: string, body: object) {
    const response = await api.put(uri, body);
    return response.data;
  }

  static async delete(uri: string) {
    const response = await api.delete(uri);
    return response.data;
  }

  static async findAll(uri: string, page = 1, take = 10) {
    const response = await api.get(uri, {
      params: { page, take },
    });
    return response.data;
  }

  static async findById(uri: string) {
    const response = await api.get(uri);
    return response.data;
  }
}
