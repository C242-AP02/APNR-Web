"use client"
import { Suspense, useEffect } from 'react';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import { UserAuth } from '@/context/authContext';

function SignInPage() {
  const redirect = useSearchParams().get("redirect");
  const router = useRouter();
  const { user, handleLogin } = UserAuth();

  useEffect(() => {
      if (user) {
          router.replace(`${redirect}`);
      }
  }, [user, redirect, router]);

  const handleSignIn = async () => {
      await handleLogin();
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500">
      <div className="bg-white p-10 rounded-lg shadow-xl w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-6xl font-extrabold flex justify-center items-center mb-2">
            <span className="bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              A
            </span>
            <span className="bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              PNR
            </span>
          </div>
          <p className="text-gray-700 text-sm font-medium">
          </p>
        </div>
        <button
          onClick={handleSignIn}
          type="button"
          className="flex items-center justify-center space-x-3 w-full py-3 bg-indigo-700 hover:bg-indigo-900 text-white rounded-lg transition-transform transform hover:scale-105 shadow-md font-semibold"
        >
          <div className="bg-white rounded-full p-1">
            <Image src={'/google.svg'} width={24} height={24} alt="Google Icon" />
          </div>
          <span>Login with Google</span>
        </button>
      </div>
    </div>
  );
}

export default function PageWrapper() {
  return (
    <Suspense>
      <SignInPage />
    </Suspense>
  );
}
