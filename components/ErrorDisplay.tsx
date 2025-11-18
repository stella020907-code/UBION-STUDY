
import React from 'react';

interface ErrorDisplayProps {
  message: string;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => (
  <div className="absolute inset-0 bg-red-50 flex items-center justify-center p-4 rounded-xl">
    <div className="text-center">
        <i className="fa-solid fa-circle-exclamation text-4xl text-red-500"></i>
        <h3 className="mt-2 text-lg font-semibold text-red-700">오류 발생</h3>
        <p className="text-red-600 mt-1">{message}</p>
    </div>
  </div>
);
