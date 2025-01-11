export interface UserData {
    lastname: string;
    firstname: string;
    email: string;
    password: string; 
  
}


export interface Credentials {
    email: string;
    password: string;

}


export interface AuthResponse {
    access_token: string;
    refresh_token: string;
    token_type: string;
    user: {
        firstname: string;
        lastname: string;
        username: String;
      };

}

export interface RegisterResponse {
    message: string;
    success: boolean;
  }