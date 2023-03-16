import axios from 'axios';
import React, { useState } from 'react';
import { Container, Form, Input, Button, LogoImage } from './styled';
import { useCookies } from 'react-cookie';

function LoginScreen(): JSX.Element {
  const [cookies, setCookie] = useCookies(['jwt']);
  const [values, setValues] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e: any) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/users/login/',
        values
      );
      setCookie('jwt', response.data.token);
    } catch (error) {
      throw '로그인 실패';
    }
  };

  return (
    <Container>
      <LogoImage src={process.env.PUBLIC_URL + '/img/mainLogo.PNG'} />
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
        <Button>Login</Button>
      </Form>
    </Container>
  );
}

export default LoginScreen;
