import Link from 'next/link';
import React, { useState } from 'react';

import { Navbar } from '../components/Navbar';
import { Stepper } from '../components/Stepper';

const services = [
  {
    label: 'Photo professionnel',
    img: '/placeholder1.png', // Replace with actual image paths
    href: '/fashion-try-on?title=Photo%20professionnel',
  },
  {
    label: 'Fashion try on',
    img: '/placeholder2.png',
    href: '/fashion-try-on?title=Fashion%20Try%20On',
  },
  {
    label: 'Changer de coiffure',
    img: '/placeholder3.png',
    href: '/fashion-try-on?title=Changer%20de%20coiffure',
  },
  {
    label: "Avancer d'image",
    img: '/placeholder4.png',
    href: '/fashion-try-on?title=Avancer%20d%27image',
  },
];

export const HomeSelection = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar onHamburgerClick={() => setMenuOpen(true)} />

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex bg-black/40">
          <div className="flex h-full w-64 flex-col bg-white p-6 shadow-lg">
            <button
              className="mb-6 self-end p-2 text-gray-500 hover:text-black"
              onClick={() => setMenuOpen(false)}
              aria-label="Fermer le menu"
            >
              <span className="block h-0.5 w-6 translate-y-1 rotate-45 bg-black"></span>
              <span className="block h-0.5 w-6 -translate-y-1 -rotate-45 bg-black"></span>
            </button>
            <nav className="flex flex-col gap-4">
              <Link
                href="/photo-professionnel"
                onClick={() => setMenuOpen(false)}
                className="text-lg font-medium text-black hover:text-primary-500"
              >
                Créer une photo
              </Link>
            </nav>
          </div>
          {/* Click outside to close */}
          <div className="flex-1" onClick={() => setMenuOpen(false)} />
        </div>
      )}

      {/* Tagline */}
      <div className="mb-6 mt-8 px-4 text-center">
        <h1 className="text-lg font-semibold leading-tight">
          Avant changer, essayez d&apos;abord, c&apos;est moins cher
        </h1>
      </div>

      {/* Stepper */}
      <Stepper currentStep={1} />

      {/* Service Cards Grid */}
      <div className="grid grid-cols-2 gap-4 px-4">
        {services.map((service) => (
          <Link
            key={service.label}
            href={service.href}
            className="flex flex-col items-center rounded-xl bg-gray-100 p-4 shadow transition hover:bg-gray-200"
          >
            <img
              src={service.img}
              alt={service.label}
              className="mb-2 size-16 rounded object-cover"
            />
            <span className="text-center text-sm font-medium text-gray-800">
              {service.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
