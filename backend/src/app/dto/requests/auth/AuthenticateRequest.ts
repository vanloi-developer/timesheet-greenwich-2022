export interface AuthenticateRequest {
    userNameOrEmailAddress: string;
  
    password: string;
  
    rememberClient?: boolean;
  }
  