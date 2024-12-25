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

  async post(path: string, data: any) {
    const response = await fetch(`${this.baseURL}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const body = await response.json();
      throw new ApiError(body, response);
    }
    const body = await response.json();
    return body;
  }

  async put(path: string, data: any) {
    const response = await fetch(`${this.baseURL}${path}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const body = await response.json();
      throw new ApiError(body, response);
    }
    const body = await response.json();
    return body;
  }

  async delete(path: string, id: string) {
    const response = await fetch(`${this.baseURL}${path}/${id}`, {
      method: "DELETE",
    });
    return response;
  }
}
