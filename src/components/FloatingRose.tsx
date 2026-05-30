import React from 'react';

interface FloatingRoseProps {
  className?: string;
  size?: number;
}

const FloatingRose: React.FC<FloatingRoseProps> = ({ className = '', size = 60 }) => {
  return (
    <svg
      className={`float-rose ${className}`}
      width={size}
      height={size}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M30 5C30 5 20 15 20 25C20 32 25 38 30 40C35 38 40 32 40 25C40 15 30 5 30 5Z"
        fill="rgba(217, 68, 54, 0.3)"
      />
      <path
        d="M30 40C30 40 25 42 22 48C20 52 25 55 30 55C35 55 40 52 38 48C35 42 30 40 30 40Z"
        fill="rgba(217, 68, 54, 0.2)"
      />
      <path
        d="M30 15C30 15 25 18 25 24C25 28 28 32 30 33C32 32 35 28 35 24C35 18 30 15 30 15Z"
        fill="rgba(217, 68, 54, 0.15)"
      />
      <circle cx="30" cy="10" r="4" fill="rgba(217, 68, 54, 0.25)" />
      <path
        d="M18 28C15 26 10 28 8 32C6 36 8 40 12 42"
        stroke="rgba(217, 68, 54, 0.2)"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M42 28C45 26 50 28 52 32C54 36 52 40 48 42"
        stroke="rgba(217, 68, 54, 0.2)"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  );
};

export default React.memo(FloatingRose);
