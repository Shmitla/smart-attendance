'use client'
import Link from 'next/link';

export default function Page() {
  return (
    <div className="mx-auto max-w-md text-center">
      <h1 className="text-4xl font-bold text-blue-700 mb-6">Welcome to isimapp for School Management System</h1>
      <p className="text-lg text-gray-800 mb-6">Streamline school management, class organization, and student editing in the institute.</p>
      <p className="text-lg text-gray-800 mb-6">Seamlessly track attendance, assess performance, provide feedback, access records, view marks, and communicate effortlessly.</p>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full mb-6">
        <Link href="/usertype">Login</Link>
      </button>
      <p className="text-lg text-gray-800">Don't have an account? <Link href="/usertype" className="text-blue-700 font-bold hover:underline">Sign up</Link></p>
    </div>
  );
}
