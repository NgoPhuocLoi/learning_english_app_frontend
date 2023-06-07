import { createApiClient } from "./api.service";

class AuthService {
  constructor(endPoint = "/access") {
    this.api = createApiClient(endPoint);
  }

  async login({ email, password }) {
    return await this.api.post("/login", {
      email,
      password,
    });
  }

  async register({ email, name, password }) {
    return await this.api.post("/register", {
      name,
      email,
      password,
    });
  }

  async loginWithGoogle() {
    return await this.api.get("/google");
  }
}

export default AuthService;
