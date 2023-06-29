import { Container, LogoImage } from '../components/auth/styled';
import AuthForm from '../components/auth/AutoForm';
import useAxiosWithAuth from '../hook/useAxiosWithAuth';
import { useNavigate } from 'react-router-dom';

function SignUp(): JSX.Element {
  const axiosInstance = useAxiosWithAuth();
  const navigate = useNavigate();

  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      await axiosInstance.post('signup', values);
      navigate('/');
    } catch (error) {
      throw '회원가입 실패';
    }
  };

  return (
    <Container>
      <LogoImage src={require('../assets/img/mainLogo.PNG')} />
      <AuthForm onSubmit={handleSubmit} submitButtonText="회원가입 하기" />
    </Container>
  );
}

export default SignUp;
