import React from 'react';
import { Input } from './styled';

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
}

function PasswordInput({ value, onChange }: PasswordInputProps): JSX.Element {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <Input
      type="password"
      placeholder="Password"
      value={value}
      onChange={handleChange}
    />
  );
}
export default PasswordInput;
