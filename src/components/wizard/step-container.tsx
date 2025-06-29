'use client';
import { useWizard } from '@/context/wizard-context';

export default function StepContainer({ children, stepNumber }) {
  const { currentStep } = useWizard();
  
  return currentStep === stepNumber ? (
    <div className="animate-fade-in">
      <div className="mb-6 flex items-center">
        <div className="flex-1 border-t border-gray-200"></div>
        <span className="mx-4 text-sm font-medium text-primary">
          Step {stepNumber} of 13
        </span>
        <div className="flex-1 border-t border-gray-200"></div>
      </div>
      {children}
    </div>
  ) : null;
}