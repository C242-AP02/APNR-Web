import React, { useEffect } from 'react';

export default function ConfirmationModal ({ handleConfirm, message }) {

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
        document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex justify-center items-center">
      <div className="mx-8 bg-white p-8 rounded-md shadow-md w-full max-w-xl">
        <p className="font-semibold mb-7">{message}</p>
        <div className="flex justify-end">
          <button onClick={() => handleConfirm(true)} className="px-4 py-2 bg-green-700 hover:bg-green-900 text-white rounded-md mr-4">Yes</button>
          <button onClick={() => handleConfirm(false)} className="px-4 py-2 bg-red-700 hover:bg-red-900 text-white rounded-md">No</button>
        </div>
      </div>
    </div>
  )
}