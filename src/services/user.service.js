import { createApiClient } from "./api.service";

class UserService {
  constructor(endPoint = "/user") {
    this.api = createApiClient(endPoint, true);
  }

  async getCurrentUser() {
    return await this.api.get("/");
  }
}

export default UserService;
