'use client';
import { useWizard } from '@/context/wizard-context';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { proponentSchema } from '@/lib/validation/pfd-schema';

export default function SectionA() {
  const { updateFormData, nextStep } = useWizard();
  const form = useForm({ resolver: zodResolver(proponentSchema) });

  const onSubmit = (data) => {
    updateFormData({ proponentInfo: data });
    nextStep();
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <h2 className="text-xl font-semibold mb-4">Project Proponent Information</h2>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <Input
          label="Originating Agency/Organisation"
          {...form.register('originatingAgency')}
          error={form.formState.errors.originatingAgency}
        />
        <Input
          label="Contact Name"
          {...form.register('contactName')}
          error={form.formState.errors.contactName}
        />
      </div>
      
      {/* Additional fields... */}
      
      <NavigationControls />
    </form>
  );
}