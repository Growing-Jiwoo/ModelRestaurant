import React from 'react';
import { Container, LogoImage } from '../components/auth/styled';
import AuthForm from '../components/auth/AutoForm';
import useAxiosWithAuth from '../hook/useAxiosWithAuth';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function SignIn(): JSX.Element {
  const axiosInstance = useAxiosWithAuth();
  const navigate = useNavigate();
  const [, setCookie] = useCookies(['jwt']);

  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      const response = await axiosInstance.post('users/login/', values);
      setCookie('jwt', response.data.token);
      navigate('/home');
    } catch (error) {
      throw '로그인 실패';
    }
  };

  return (
    <Container>
      <LogoImage src={require('../assets/img/mainLogo.PNG')} />
      <AuthForm
        onSubmit={handleSubmit}
        submitButtonText="SignIn"
        navigateButtonText="SignUp"
        navigateTo="/SignUp"
      />
    </Container>
  );
}

export default SignIn;
