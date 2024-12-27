import { useRouter } from 'next/router';
import { useState } from 'react';
import FormWrapper from '../../components/base/FormWrapper';
import Input from '../../components/base/Input';
import Button from '../../components/base/Button';
import '../../styles/globals.css';

export default function Page() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      router.push('/admin/products');
    } else {
      alert('Invalid credentials');
    }
  }

  return (
    <FormWrapper>
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
        Admin Login
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          className="mt-2"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          className="mt-2 mt-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button className="mt-2" type="submit">
          Login
        </Button>
      </form>
    </FormWrapper>
  );
}
