'use client';

import { useState } from 'react';
import TextInput from '../../base/TextInput';
import Card from '../../base/Card';
import SubmitButton from '../../base/SubmitButton';

export default function PasswordForm({ onSubmit }) {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ oldPassword, newPassword });
  };

  const validatePassword = (e) => {
    if (!e.target.value) {
      e.target.setCustomValidity('Please fill out this field.');
    } else if (e.target.value && e.target.value.length < 8) {
      e.target.setCustomValidity('Minimum 8 characters required.');
    } else {
      e.target.setCustomValidity('');
    }
  };

  const validateConfirmPassword = (e) => {
    if (!e.target.value) {
      e.target.setCustomValidity('Please fill out this field.');
    } else if (e.target.value !== newPassword) {
      e.target.setCustomValidity('Passwords do not match.');
    } else {
      e.target.setCustomValidity('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card title="Password" description="Change the password">
        <TextInput
          label="Old Password"
          type="password"
          name="oldPassword"
          placeholder="Enter old password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          required={true}
        />
        <TextInput
          label="New Password"
          type="password"
          name="newPassword"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => {
            validatePassword(e);
            setNewPassword(e.target.value);
          }}
          required={true}
        />
        <TextInput
          label="Confirm New Password"
          type="password"
          name="confirmNewPassword"
          placeholder="Enter new password again"
          value={confirmPassword}
          onChange={(e) => {
            validateConfirmPassword(e);
            setConfirmPassword(e.target.value);
          }}
          required={true}
        />

        <SubmitButton text="Save" />
      </Card>
    </form>
  );
}
