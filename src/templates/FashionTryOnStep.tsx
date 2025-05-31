import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { FileUploader } from '../components/FileUploader';
import { Navbar } from '../components/Navbar';
import { Stepper } from '../components/Stepper';

export const FashionTryOnStep = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const title = router.query.title
    ? decodeURIComponent(router.query.title as string)
    : 'Fashion Try On';

  // State for uploaded images
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [userPhotoError, setUserPhotoError] = useState<string | null>(null);
  const [clothingPhoto, setClothingPhoto] = useState<string | null>(null);
  const [clothingPhotoError, setClothingPhotoError] = useState<string | null>(
    null,
  );

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
      <Stepper currentStep={2} />

      {/* Title */}
      <div className="mb-4 px-4 text-center">
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>

      {/* Photo Upload Cards */}
      <div className="mb-8 flex flex-col gap-4 px-4">
        {/* User Photo Uploader */}
        <div className="flex w-full flex-col items-center justify-center rounded-xl border bg-gray-50 p-6">
          <FileUploader
            onUploadComplete={setUserPhoto}
            onUploadError={setUserPhotoError}
            allowedTypes={['image/jpeg', 'image/png', 'image/webp']}
            maxSizeMB={10}
          />
          {userPhoto && (
            <img
              src={userPhoto}
              alt="User uploaded"
              className="mt-4 size-24 rounded object-cover shadow"
            />
          )}
          {userPhotoError && (
            <div className="mt-2 text-xs text-red-500">{userPhotoError}</div>
          )}
        </div>
        {/* Clothing Photo Uploader */}
        <div className="flex w-full flex-col items-center justify-center rounded-xl border bg-gray-50 p-6">
          <FileUploader
            onUploadComplete={setClothingPhoto}
            onUploadError={setClothingPhotoError}
            allowedTypes={['image/jpeg', 'image/png', 'image/webp']}
            maxSizeMB={10}
          />
          {clothingPhoto && (
            <img
              src={clothingPhoto}
              alt="Clothing uploaded"
              className="mt-4 size-24 rounded object-cover shadow"
            />
          )}
          {clothingPhotoError && (
            <div className="mt-2 text-xs text-red-500">
              {clothingPhotoError}
            </div>
          )}
        </div>
      </div>

      {/* Action Button */}
      <div className="mb-8 mt-auto px-4">
        <button
          className="w-full rounded-lg bg-black py-3 text-base font-semibold text-white shadow transition hover:bg-gray-900"
          onClick={() =>
            router.push(`/photo-result?title=${encodeURIComponent(title)}`)
          }
        >
          Creer ma photo
        </button>
      </div>
    </div>
  );
};
