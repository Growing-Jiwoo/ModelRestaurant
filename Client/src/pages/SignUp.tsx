import { useState } from 'react';
import {
  Container,
  Form,
  Input,
  Button,
  LogoImage,
  ButtonContainer,
} from '../components/auth/styled';
import useAxiosWithAuth from '../hook/useAxiosWithAuth';
import { useNavigate } from 'react-router-dom';

function SignUp(): JSX.Element {
  const axiosInstance = useAxiosWithAuth();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Username"
          name="username"
          value={values.username}
          onChange={handleChange}
        />
        <Input
          type="password"
          placeholder="Password"
          name="password"
          value={values.password}
          onChange={handleChange}
        />
        <ButtonContainer>
          <Button>회원가입 하기</Button>
        </ButtonContainer>
      </Form>
    </Container>
  );
}

export default SignUp;
