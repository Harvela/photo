import React from 'react';

interface StepperProps {
  currentStep: 1 | 2 | 3;
}

export const Stepper: React.FC<StepperProps> = ({ currentStep }) => (
  <div className="mb-6 mt-4 flex items-center justify-center gap-2">
    {[1, 2, 3].map((step) => (
      <div className="flex items-center" key={step}>
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            currentStep === step
              ? 'bg-black text-white'
              : 'bg-gray-200 text-black'
          }`}
        >
          {`Step ${step}`}
        </span>
      </div>
    ))}
  </div>
);
