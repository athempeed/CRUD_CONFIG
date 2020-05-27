import fs from "fs";

export class ConfigController {
  constructor(configService) {
    this.configService = configService;
  }
  createConfig(data, response) {
    this.configService.createConfig(data, response);
  }

  updateConfig(data, response) {
    console.log("configController:update");
    this.configService.updateConfig(data, response);
  }

  deleteConfig(response) {
    this.configService.deleteConfig(response);
  }

  readConfig(response) {
    this.configService.readConfig(response);
  }
}
