import { useState } from 'react';

export type UseStepperProps = {
  steps: string[];
  initialActiveStep?: number;
};

export type UseStepperReturnType = {
  activeStep: number;
  setActiveStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
};

export const useStepper = ({
  steps = [],
  initialActiveStep = 0,
}: UseStepperProps): UseStepperReturnType => {
  const [currentStep, setCurrentStep] = useState(initialActiveStep);

  const setActiveStep = (step: number) => {
    if (step < 0 || step > steps.length) return;

    setCurrentStep(step);
  };

  const nextStep = () => {
    if (currentStep === steps.length) return;

    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (currentStep === 0) return;

    setCurrentStep((prev) => prev - 1);
  };

  return {
    activeStep: currentStep,
    setActiveStep,
    nextStep,
    prevStep,
  };
};
