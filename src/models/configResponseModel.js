import { BaseModel } from "./baseModel";

export class CondfigResopnseModel extends BaseModel {
  data;
  constructor(status, message, data) {
    super(status, message);
    this.key = data;
  }
}
