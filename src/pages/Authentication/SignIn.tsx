import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaUser} from 'react-icons/fa';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import LogoDark from '../../images/logo/icon-128x128-removebg-preview.png';
import Logo from '../../images/logo/icon-128x128-removebg-preview.png';
// @ts-ignore
import DBSourse from '../../data/api/db-sourse.js';
import { AuthLayout } from '../../layout/auth/AuthLayout.js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  role: string;
}

const SignIn: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleIdentifierChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdentifier(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
        const response = await DBSourse.login(identifier, password);
        if (response.token) {
            localStorage.setItem('authToken', response.token);

            // Decode the JWT token to get user role
            const decodedToken: DecodedToken = jwtDecode(response.token);
            const userRole = decodedToken.role;

            // Redirect based on user role
            if (userRole === 'admin') {
                navigate('/admin');
            } else {
                navigate('/dashboard');
            }

            toast.success('Login berhasil!');
        } else if (response.error) {
            toast.error(response.error);
        } else {
            toast.error('Login gagal. Silakan coba lagi.');
        }
    } catch (error) {
        toast.error('Terjadi kesalahan saat login. Silakan coba lagi.');
        console.error('Error during login', error);
    }
};

  return (
    <AuthLayout>
      <Breadcrumb pageName="Sign In" />
      <div className="rounded-sm border border-stroke dark:border-indigo-300 bg-white shadow-default dark:bg-boxdark snap-y">
        <div className="flex items-center">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="py-17.5 px-26 text-center">
              <Link className="mb-5.5 inline-block" to="/">
                <div className="flex items-center justify-center">
                  <img className="hidden dark:block w-20" src={Logo} alt="Logo" />
                  <h2 className="hidden dark:block ml-2 text-3xl font-bold text-white">Cinta Bumi</h2>
                </div>
                <div className="flex items-center justify-center">
                  <img className="dark:hidden w-20" src={LogoDark} alt="Logo" />
                  <h2 className="dark:hidden ml-2 text-3xl font-bold text-black">Cinta Bumi</h2>
                </div>
              </Link>
              {/* SVG omitted for brevity */}
            </div>
          </div>
          <div className="w-full xl:w-1/2">
            <div className="py-10 px-8 xl:py-20 xl:px-16">
              <h1 className="mb-6 text-2xl font-bold text-center">Sign In</h1>
              <form onSubmit={handleSubmit}>
              <div className="mb-4 relative">
              <label htmlFor="identifier" className="block text-sm font-medium text-gray-700">
                Email or Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="identifier"
                  value={identifier}
                  onChange={handleIdentifierChange}
                  className="mt-1 block w-full pr-10 pl-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  required
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <FaUser size={20} />
                </span>
              </div>
            </div>


                <div className="mb-4">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                  <div className="relative">
                    <input
                      type={passwordVisible ? 'text' : 'password'}
                      id="password"
                      value={password}
                      onChange={handlePasswordChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      required
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 flex items-center px-2"
                    >
                      {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700"
                >
                  Sign In
                </button>
                <div className="mt-6 text-center">
                  <p>
                  Tidak memiliki akun apa pun?{' '}
                    <Link to="/signup" className="text-primary">
                      Daftar
                    </Link>
                  </p>
                </div>
              </form>
              <div className="mt-6 text-center">
                <Link to="/forgot-password" className="text-indigo-600 hover:text-indigo-700">Forgot your password?</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignIn;
