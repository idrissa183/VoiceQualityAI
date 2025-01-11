import axiosInstance from "@/config/axiosInstance";
import { AuthResponse, Credentials, RegisterResponse, UserData } from "@/models/user";


export const registerUser = async (userData: UserData): Promise<RegisterResponse> => {
  try {
    const response = await axiosInstance.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};


// Fonction pour la connexion
export const loginUser = async (credentials: Credentials): Promise<AuthResponse> => {
  try {
    const formData = new FormData();
    formData.append('username', credentials.email);
    formData.append('password', credentials.password);

    const response = await axiosInstance.post('/auth/token', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    console.log('Response data:', response.data);

    const { access_token, refresh_token, user } = response.data;
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
    if (user) {
      localStorage.setItem('user', JSON.stringify({
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
      }));
    }

    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};


// Fonction pour la déconnexion
export const logoutUser = async (): Promise<void> => {
  try {
    await axiosInstance.post('/auth/logout');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};