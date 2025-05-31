import Link from 'next/link';
import React from 'react';

type NavbarProps = {
  rightContent?: React.ReactNode;
  onHamburgerClick?: () => void;
};

export const Navbar: React.FC<NavbarProps> = ({
  rightContent,
  onHamburgerClick,
}) => (
  <div className="relative flex min-h-[56px] items-center border-b bg-white px-4 py-3">
    <button
      className="z-10 p-2 focus:outline-none"
      onClick={onHamburgerClick}
      aria-label="Menu"
    >
      <span className="mb-1 block h-0.5 w-6 bg-black"></span>
      <span className="mb-1 block h-0.5 w-6 bg-black"></span>
      <span className="block h-0.5 w-6 bg-black"></span>
    </button>
    <div className="pointer-events-auto absolute inset-x-0 flex justify-center">
      <Link href="/">
        <span className="cursor-pointer"></span>
      </Link>
    </div>
    {rightContent && <div className="ml-auto">{rightContent}</div>}
  </div>
);
