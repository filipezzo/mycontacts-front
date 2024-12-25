interface ApiErrorBody {
  message?: string;
  [key: string]: any;
}

export default class ApiError extends Error {
  body: ApiErrorBody | null;
  response: Response;

  constructor(body: ApiErrorBody | null, response: Response) {
    super();

    this.body = body;
    this.name = "ApiError";
    this.response = response;
    this.message =
      body?.message || `${response.status} - ${response.statusText}`;
  }
}
