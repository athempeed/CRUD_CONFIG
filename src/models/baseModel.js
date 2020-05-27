export class BaseModel {
  status;
  message;
  constructor(status, message) {
    this.status = status;
    this.message = message;
  }
}
