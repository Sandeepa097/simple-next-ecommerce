import { useRouter } from 'next/router';
import { useState } from 'react';
import FormWrapper from '../../components/FormWrapper';
import Input from '../../components/Input';
import Button from '../../components/Button';

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      router.push('/admin');
    } else {
      alert('Invalid credentials');
    }
  }

  return (
    <FormWrapper>
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Admin Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Login</Button>
      </form>
    </FormWrapper>
  );
}
