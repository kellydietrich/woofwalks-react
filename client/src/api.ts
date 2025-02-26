import axios, { AxiosResponse, AxiosRequestConfig } from "axios"; // use axios for api endpoint management / client-side communication to server
import { Game } from './types/game'; 
import { User, VerifyInput } from './types/user'; 
import { CreateSessionInput } from './types/session'; 


// create axios instance
const api = axios.create({
  baseURL: "http://localhost:3311/api/games", // server api url
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true
});

const userApi = axios.create({
  baseURL: "http://localhost:3311/api/users", // server api url
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true
});

const sessionApi = axios.create({
  baseURL: "http://localhost:3311/api/sessions", // server api url
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true
});



export const getGames = async (config: AxiosRequestConfig): Promise<AxiosResponse> => {
    // const config ={
    //   headers: {
    //     Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    //   }
    // }
    const response = await api.get('/', config);
    return response;
  };

// export const getGames = async (): Promise<AxiosResponse> => {
//     const response = await api.get('/');
//     return response;
//   };

  export const getGame = async (id: string): Promise<AxiosResponse> => {
    const response = await api.get(`/${id}`);
    return response;
  };
  
  export const createGame = async (newGame: Game): Promise<AxiosResponse> => {
    const response = await api.post('/', newGame);
    console.log(response)
    return response;
  };

  export const updateGame = async (id: string, updatedGame: Game): Promise<AxiosResponse> => {
    const response = await api.put(`/${id}`, updatedGame);
    return response;
  };
  
  export const deleteGame = async (id: string): Promise<AxiosResponse> => {
    const response = await api.delete(`/${id}`);
    return response;
  };


  const createUser = async (user: User): Promise<AxiosResponse> => {
    const response = await userApi.post('/', user);
    return response;
  };

  const verifyUser = async (id: string, verificationCode: string): Promise<AxiosResponse> => {
    const response = await userApi.post(`/verify/${id}/${verificationCode}`);
    const { accessToken, refreshToken } = response.data;
    console.log(response.data);
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    return response;
  };

  const loginUser = async (input: CreateSessionInput): Promise<AxiosResponse> => {
    try {
      const response = await sessionApi.post('/', input);
      const { accessToken, refreshToken } = response.data;
      // Store the tokens in localStorage or secure cookie for later use
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      console.log(localStorage.getItem('accessToken'));
      return response;
    } catch (error) {
      // Handle login errors
      throw error;
    }
  };

  const getRefreshToken = async (): Promise<AxiosResponse> => {
    try {
      const response = await sessionApi.post('/refresh', {
        headers: {
          'x-refresh': `${localStorage.getItem('refreshToken')}`
      }
      });
      console.log(response.data);
      const {  accessToken } = response.data;
      // Store the tokens in localStorage or secure cookie for later use
      // localStorage.setItem('token', token);
      // localStorage.setItem('refreshToken', refreshToken);
      return response;
    } catch (error) {
      // Handle login errors
      throw error;
    }
  };

  const getCurrentUser = async (): Promise<AxiosResponse> => {
      const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    }
    const response = await userApi.get('/me', config);
    console.log(response.data);
    return response;
  };




const gamesApi = {
  getGames,
  getGame,
  createGame,
  updateGame,
  deleteGame, 
  createUser, 
  loginUser,
  verifyUser,
  getRefreshToken,
  getCurrentUser
}

export default gamesApi;
  

  
  
  