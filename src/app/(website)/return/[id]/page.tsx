import Link from 'next/link';
import React from 'react';
import { BsCheck2Square } from 'react-icons/bs';

interface ReturnPageProps {
  params: {
    id: string;
  };
}

const ReturnPage = ({params}: ReturnPageProps) => {
  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center font-sans bg-green-50/40">
      <div className="relative w-full max-w-lg flex flex-col items-center justify-center">
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
          <BsCheck2Square className="h-12 w-12 text-green-600" />
        </div>

        <h1 className="mb-6 text-4xl font-semibold text-green-600">
          Linking was Successful!
        </h1>

        <p className="mb-8 text-gray-600 leading-relaxed text-xl text-center font-medium">
          Congrats on linking your account to marshal Ul. You can now start selling your products!
        </p>

        <p className="mb-6 text-gray-500 text-lg">
          Your linked ID: <span className="font-bold">{params.id}</span>
        </p>

        <Link
          href="/"
          className="inline-block rounded-lg bg-primary px-8 py-3 text-white font-semibold shadow-lg transition-transform duration-300 hover:scale-105 hover:from-blue-800 hover:to-indigo-800"
        >
          Go to Home Page
        </Link>
      </div>
    </div>
  );
};

export default ReturnPage;
