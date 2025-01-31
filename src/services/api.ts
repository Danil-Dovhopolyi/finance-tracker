import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dummyjson.com'
});

export interface SignInCredentials {
  username: string;
  password: string;
}

interface AuthResponse {
  id: string;
  username: string;
  email: string;
  token: string;
}

export const authApi = {
  signIn: (credentials: SignInCredentials): Promise<AuthResponse> => {
    return new Promise((resolve, reject) => {
      api.post<AuthResponse>('/auth/login', credentials)
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    });
  }
};