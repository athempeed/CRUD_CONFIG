import { BaseModel } from "./baseModel";

export class LoginResopnseModel extends BaseModel {
  key;
  constructor(status, message, key) {
    super(status, message);
    this.key = key;
  }

  //   sendResponse() {
  //     return { status: this.status, message: this.message };
  //   }
}
