"use client";
import React, { useState } from "react";
import axios from 'axios';

const Register = () => {
    const baseURL = process.env.NEXT_PUBLIC_HOSTNAME + "register";

    const [formData, setFormData] = useState({
        username: '',
        school: '',
        email: '',
        password: '',
        rememberMe: false
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFormData({
            ...formData,
            [name]: checked
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(baseURL, formData);
            console.log(response);
            alert('Account created!');
            router.push('/');
        } catch (error) {
            console.error(error);
            alert('Something went wrong...');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md">
                <h2 className="text-2xl font-bold mb-4">Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-600">Username</label>
                        <input type="text" id="username" name="username" value={formData.username} onChange={handleInputChange} className="mt-1 p-2 w-full border rounded-md" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="school" className="block text-sm font-medium text-gray-600">School</label>
                        <input type="text" id="school" name="school" value={formData.school} onChange={handleInputChange} className="mt-1 p-2 w-full border rounded-md" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className="mt-1 p-2 w-full border rounded-md" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
                        <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} className="mt-1 p-2 w-full border rounded-md" />
                    </div>
                    <div className="mb-4 flex items-center">
                        <input type="checkbox" id="rememberMe" name="rememberMe" checked={formData.rememberMe} onChange={handleCheckboxChange} className="mr-2" />
                        <label htmlFor="rememberMe" className="text-sm text-gray-600">Remember me</label>
                    </div>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Register</button>
                </form>
                <p className="mt-4 text-sm text-gray-600">Already have an account? <a href="/admin/login" className="text-blue-500">Login</a></p>
            </div>
        </div>
    );
};

export default Register;
