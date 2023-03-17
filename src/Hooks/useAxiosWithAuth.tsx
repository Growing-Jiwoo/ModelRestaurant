import { useCookies } from 'react-cookie';
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestHeaders,
} from 'axios';
import { useNavigate } from 'react-router-dom';

const useAxiosWithAuth = (): AxiosInstance => {
  const [cookies, setCookie] = useCookies(['jwt']);
  const navigate = useNavigate();

  const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
    headers: {
      Authorization: `Bearer ${cookies.jwt}`,
    },
  });

  axiosInstance.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = cookies.jwt;
      if (token) {
        config.headers = config.headers || {};
        (
          config.headers as AxiosRequestHeaders
        ).Authorization = `Bearer ${token}`;
      } else if (token === undefined) {
        navigate('/');
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      const statusCode = error.response?.status;
      if (statusCode === 401) {
        error.response.statusText = 'Unauthorized';
        error.response.status = 401;
        navigate('/');
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxiosWithAuth;
