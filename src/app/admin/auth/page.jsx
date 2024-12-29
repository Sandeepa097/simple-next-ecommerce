'use client';

import LoginForm from '../../../components/admin/cms/LoginForm';

export default function Page() {
  async function handleSubmit({ username, password }) {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      window.location.href = '/admin/products';
    } else {
      alert('Invalid credentials');
    }
  }

  return <LoginForm onSubmit={handleSubmit} />;
}
