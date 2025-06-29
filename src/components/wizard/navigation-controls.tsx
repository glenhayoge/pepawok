// components/wizard/navigation-controls.tsx
'use client';
import { Button } from '@/components/ui/button';
import { useWizard } from '@/context/wizard-context';

export default function NavigationControls() {
  const { currentStep, totalSteps, nextStep, prevStep } = useWizard();
  
  return (
    <div className="mt-8 flex justify-between">
      {currentStep > 1 && (
        <Button variant="outline" onClick={prevStep}>
          Previous
        </Button>
      )}
      
      <div className="flex-1"></div>
      
      {currentStep < totalSteps ? (
        <Button onClick={nextStep}>Next</Button>
      ) : (
        <Button type="submit">Submit PFD</Button>
      )}
    </div>
  );
}