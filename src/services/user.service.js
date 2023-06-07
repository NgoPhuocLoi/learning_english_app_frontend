import { createApiClient } from "./api.service";

class UserService {
  constructor(endPoint = "/user") {
    this.api = createApiClient(endPoint, true);
  }

  async getCurrentUser() {
    return await this.api.get("/");
  }

  async updateProgress({ topicId, completed }) {
    return await this.api.put("/update-progress", { topicId, completed });
  }

  async updateLevel({ currentLevel }) {
    return await this.api.put("/update-level", { currentLevel });
  }
}

export default UserService;
