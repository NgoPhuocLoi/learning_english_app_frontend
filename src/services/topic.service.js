import { createApiClient } from "./api.service";

class TopicService {
  constructor(endPoint = "/topic") {
    this.api = createApiClient(endPoint);
  }

  async getAllTopics(query) {
    return await this.api.get("", {
      params: query,
    });
  }
}

export default TopicService;
