'use client';

import { useRef, useState } from 'react';

import apiClient from '@/lib/api';

import { Button } from './Button';

interface FileUploaderProps {
  onUploadComplete: (url: string) => void;
  onUploadError: (error: string) => void;
  maxSizeMB?: number;
  allowedTypes?: string[];
}

export function FileUploader({
  onUploadComplete,
  onUploadError,
  maxSizeMB = 10,
  allowedTypes = ['image/jpeg', 'image/png', 'image/webp'],
}: FileUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(file, 'file');
    if (!file) return;

    // Check file size
    if (file.size > maxSizeBytes) {
      onUploadError(`File size exceeds the maximum limit of ${maxSizeMB}MB`);
      return;
    }

    // Check file type
    if (!allowedTypes.includes(file.type)) {
      onUploadError(
        `File type not supported. Please upload ${allowedTypes.join(', ')}`,
      );
      return;
    }

    setFileName(file.name);
    setIsUploading(true);
    setProgress(0);

    // Create FormData for the API call
    const formData = new FormData();
    formData.append('file', file);

    try {
      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress + 5;
          return newProgress > 90 ? 90 : newProgress;
        });
      }, 300);

      // Send to the API
      const response = await apiClient.post('/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      clearInterval(progressInterval);

      if (!response.data) {
        const errorData = response.data;
        throw new Error(errorData.message || 'Upload failed');
      }

      const data = response.data.file;
      setProgress(100);

      // Call the callback with the URL from the server
      onUploadComplete(data.url);

      // Reset after a brief delay to show completion
      setTimeout(() => {
        setIsUploading(false);
        setProgress(0);
      }, 1000);
    } catch (error) {
      setIsUploading(false);
      onUploadError(error instanceof Error ? error.message : 'Upload failed');
    }
  };

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="w-full">
      <input
        type="file"
        ref={inputRef}
        onChange={handleFileChange}
        accept={allowedTypes.join(',')}
        className="hidden"
      />

      <div className="flex flex-col gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={handleButtonClick}
          disabled={isUploading}
          className="flex h-20 w-full flex-col items-center justify-center border-dashed"
        >
          {isUploading ? (
            <div className="text-sm">Uploading {fileName}...</div>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mb-2"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              <span className="text-sm">Click to upload image file</span>
              <span className="text-muted-foreground mt-1 text-xs">
                JPG, PNG, WEBP (max {maxSizeMB}MB)
              </span>
            </>
          )}
        </Button>

        {isUploading && (
          <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              className="h-2.5 rounded-full bg-[#7048e8] transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}

        {fileName && !isUploading && (
          <div className="flex items-center gap-2 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-green-500"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <span>{fileName} uploaded successfully</span>
          </div>
        )}
      </div>
    </div>
  );
}
