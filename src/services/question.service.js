import { createApiClient } from "./api.service";

class QuestionService {
  constructor(endPoint = "/question") {
    this.api = createApiClient(endPoint);
  }

  async getAllQuestions(topicId, query) {
    return await this.api.get("/" + topicId, {
      params: query,
    });
  }

  async getAllQuestionsOfTest(level) {
    return await this.api.get("/test/" + level);
  }
}

export default QuestionService;
