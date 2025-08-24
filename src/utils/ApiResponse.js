class ApiResponse {
  constructor(statusCode, payload, message) {
    this.statusCode = statusCode;
    this.payload = payload;
    this.message = message;
    this.timestamp = new Date().toLocaleString();
    this.success = statusCode >= 200 && statusCode < 300;
  }
}

export default ApiResponse;
