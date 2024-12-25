import ApiError from "../../errors/api-error";

export class HttpClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async get(path: string) {
    const response = await fetch(`${this.baseURL}${path}`);
    let body = null;

    const contentType = response.headers.get("Content-Type");
    if (contentType?.includes("application/json")) {
      body = await response.json();
    }

    if (response.ok) {
      return body;
    }

    throw new ApiError(body, response);
  }
}
