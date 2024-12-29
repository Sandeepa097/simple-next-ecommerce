'use client';

import { useState } from 'react';
import TextInput from '../../base/TextInput';
import Image from 'next/image';

export default function PageForm({ onSubmit }) {
  const appName = process.env.NEXT_PUBLIC_APP_NAME;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ username, password });
  };

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
          <Image src="/favicon.ico" alt="App logo" width={32} height={32} />
          <p className="ms-3">{appName}</p>
        </div>
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Sign in to admin panel
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <TextInput
                label="Username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter the admin username"
                required={true}
              />
              <TextInput
                label="Password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter the admin password"
                required={true}
              />
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
