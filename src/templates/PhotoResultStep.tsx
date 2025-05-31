import Link from 'next/link';
import React, { useState } from 'react';

import { Navbar } from '../components/Navbar';
import { Stepper } from '../components/Stepper';

export const PhotoResultStep = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar onHamburgerClick={() => setMenuOpen(true)} />

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex bg-black bg-opacity-40">
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

      {/* Stepper */}
      <Stepper currentStep={3} />

      {/* Title */}
      <div className="mb-8 px-4 text-center">
        <h2 className="text-xl font-semibold">Photo Professionnel</h2>
      </div>

      {/* Result Image */}
      <div className="mb-8 flex justify-center px-4">
        <img
          src="/placeholder1.png"
          alt="Résultat"
          className="h-[50vh] w-full max-w-xs rounded-xl object-cover shadow-lg"
        />
      </div>

      {/* Action Buttons */}
      <div className="mb-8 mt-auto flex justify-center gap-4 px-4">
        <button className="flex-1 rounded-lg bg-black py-3 text-base font-semibold text-white shadow transition hover:bg-gray-900">
          Telecharger
        </button>
        <button className="flex-1 rounded-lg bg-black py-3 text-base font-semibold text-white shadow transition hover:bg-gray-900">
          Recommencer
        </button>
      </div>
    </div>
  );
};
