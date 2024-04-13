
import React from 'react';
import Link from 'next/link';

const LoginPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-4xl font-bold mb-8">Want to login as</h1>
            <div className="flex flex-col space-y-4">
                <Link href="/admin/register" legacyBehavior>
                    <a className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg text-xl font-bold shadow-md transition duration-300">Admin</a>
                </Link>
                <Link href="/student/login" legacyBehavior>
                    <a className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg text-xl font-bold shadow-md transition duration-300">Student</a>
                </Link>
            </div>
        </div>
    );
};

export default LoginPage;