import React, { useState } from 'react';
import { Form, Button, ButtonContainer } from './styled';
import { useNavigate } from 'react-router-dom';
import UsernameInput from './UsernameInput';
import PasswordInput from './PasswordInput';

interface AuthFormProps {
  onSubmit: (values: { username: string; password: string }) => Promise<void>;
  submitButtonText: string;
  navigateButtonText?: string;
  navigateTo?: string;
}

function AuthForm({
  onSubmit,
  submitButtonText,
  navigateButtonText,
  navigateTo,
}: AuthFormProps): JSX.Element {
  const [values, setValues] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleUsernameChange = (username: string) => {
    setValues((prevValues) => ({
      ...prevValues,
      username,
    }));
  };

  const handlePasswordChange = (password: string) => {
    setValues((prevValues) => ({
      ...prevValues,
      password,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await onSubmit(values);
    } catch (error) {
      throw '실패';
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <UsernameInput value={values.username} onChange={handleUsernameChange} />
      <PasswordInput value={values.password} onChange={handlePasswordChange} />
      <ButtonContainer>
        <Button>{submitButtonText}</Button>
        {navigateButtonText && navigateTo && (
          <Button onClick={() => navigate(navigateTo)}>
            {navigateButtonText}
          </Button>
        )}
      </ButtonContainer>
    </Form>
  );
}

export default AuthForm;
