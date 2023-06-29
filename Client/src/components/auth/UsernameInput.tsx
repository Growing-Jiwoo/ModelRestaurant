import React from 'react';
import { Input } from './styled';

interface UsernameInputProps {
  value: string;
  onChange: (value: string) => void;
}

function UsernameInput({ value, onChange }: UsernameInputProps): JSX.Element {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <Input
      type="text"
      placeholder="Username"
      value={value}
      onChange={handleChange}
    />
  );
}
export default UsernameInput;
