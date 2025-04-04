export interface LoginCommand {
  email: string;
  password: string;
}

export interface AuthResultDto {
  access_token: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}

export interface AuthUseCasePort {
  login(command: LoginCommand): Promise<AuthResultDto>;
  validateUser(email: string, password: string): Promise<any>;
}
