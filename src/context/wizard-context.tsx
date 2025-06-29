// context/wizard-context.tsx
'use client';
import { createContext, useState, useContext } from 'react';

const WizardContext = createContext();

export function WizardProvider({ children }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);
  
  const updateFormData = (data) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const value = {
    currentStep,
    totalSteps: 13,
    formData,
    nextStep,
    prevStep,
    updateFormData,
    isSubmitting,
    setIsSubmitting
  };

  return (
    <WizardContext.Provider value={value}>
      {children}
    </WizardContext.Provider>
  );
}

export const useWizard = () => useContext(WizardContext);