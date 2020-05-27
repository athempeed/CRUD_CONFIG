export class LoginController {
  constructor(loginService) {
    this.loginService = loginService;
  }
  Login(username, password) {
    //console.log("came here login controller");
    let result = this.loginService.Login(username, password);
    return result;
  }
}
