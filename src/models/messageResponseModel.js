import { BaseModel } from "./baseModel";

export class MsgResopnseModel extends BaseModel {
  constructor(status, message) {
    super(status, message);
  }

  //   sendResponse() {
  //     return { status: this.status, message: this.message };
  //   }
}
