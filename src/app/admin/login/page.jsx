"use client";
import React from "react";
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';

const Login = () => {
  const router = useRouter();

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = {
      email: e.target.username.value,
      password: e.target.password.value,
    };

    try {
      const resdata = await signIn("credentials", {
        ...formData,
        redirect: false,
      });

      console.log(resdata);
      if (
        resdata.status === 400 ||
        resdata.status === 401 ||
        resdata.status === 403
      ) {
        console.log("Invalid Credentials!");
        alert('Invalid Credentials!');
      } else if (resdata.status === 500) {
        console.log("Server error!");
        alert('Server error!');
      } else {
        alert('Login successful!');
        router.push('/home');
        console.log(resdata);
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Something went wrong...');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-600"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-600">You don't have an account? <a href="/admin/register" className="text-blue-500">Register now</a></p>
      </div>
    </div>
  );
};

export default Login;