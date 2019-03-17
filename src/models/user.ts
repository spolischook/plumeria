export class ApiToken {
  access_token: string;
  access_token_issued_at: string;
  expires_at: string;
}
export class User {
  firstname: string;
  lastname: string;
  email: string;
  google_id: string;
  facebook_id: string;
}

export class LoginForm {
  email: string;
  password: string;
}
