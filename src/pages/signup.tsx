import React from 'react';
import { Link } from 'react-router-dom';
import { RegisterForm } from '../modules/auth/components/register-form';
import { Helmet } from 'react-helmet';

export function Signup() {
  return (
    <div className="max-w-xs p-3 mx-auto">
      <Helmet>
        <title>Signup - Shopit</title>
      </Helmet>
      <RegisterForm />
      <p className="py-2">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-700">
          Login here
        </Link>
        .
      </p>
    </div>
  );
}
