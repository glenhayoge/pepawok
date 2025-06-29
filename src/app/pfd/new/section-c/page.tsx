// app/pfd/new/section-c/page.tsx
'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SectionCSchema } from '@/lib/validation/pfd-schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import NavigationControls from '@/components/wizard/navigation-controls';
import { useWizard } from '@/context/wizard-context';
import { Plus, Trash } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

export default function SectionC() {
  const { formData, updateFormData, nextStep } = useWizard();
  const form = useForm({
    resolver: zodResolver(SectionCSchema),
    defaultValues: formData.projectDescription || {
      sectorAnalysis: '',
      projectStrategy: '',
      shortDescription: '',
      objectives: [''],
      components: [''],
      sectorPlanObjectives: [],
      projectObjectives: [{ 
        id: uuidv4(), 
        objective: '', 
        indicator: '', 
        baseline: '', 
        target: '' 
      }],
      districtPlanObjectives: []
    }
  });

  const onSubmit = (data) => {
    updateFormData({ projectDescription: data });
    nextStep();
  };

  // Dynamic list handlers
  const addObjective = () => form.setValue('objectives', [...form.watch('objectives'), '']);
  const removeObjective = (index) => {
    const objectives = [...form.watch('objectives')];
    objectives.splice(index, 1);
    form.setValue('objectives', objectives);
  };

  const addComponent = () => form.setValue('components', [...form.watch('components'), '']);
  const removeComponent = (index) => {
    const components = [...form.watch('components')];
    components.splice(index, 1);
    form.setValue('components', components);
  };

  // Policy table handlers
  const addPolicyRow = (tableName) => {
    const current = form.watch(tableName) || [];
    form.setValue(tableName, [
      ...current, 
      { id: uuidv4(), objective: '', indicator: '', baseline: '', target: '' }
    ]);
  };

  const removePolicyRow = (tableName, index) => {
    const current = [...(form.watch(tableName) || [])];
    current.splice(index, 1);
    form.setValue(tableName, current);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <h2 className="text-2xl font-bold text-primary">Section C: Project Description</h2>

      {/* C1: Description of the Sector */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">C1. Description of the Sector</h3>
        <Textarea
          label="Current Situation, Bottlenecks, and Constraints (Supported with data/statistics)"
          {...form.register('sectorAnalysis')}
          error={form.formState.errors.sectorAnalysis}
          rows={5}
        />
        <Textarea
          label="Project Strategy (How the project addresses bottlenecks)"
          {...form.register('projectStrategy')}
          error={form.formState.errors.projectStrategy}
          rows={3}
        />
      </div>

      {/* C2: Program/Project Description */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">C2. Program/Project Description</h3>
        <Textarea
          label="Short Project Description and Intended Achievements"
          {...form.register('shortDescription')}
          error={form.formState.errors.shortDescription}
          rows={3}
        />
      </div>

      {/* C3: Program/Project Objectives */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">C3. Program/Project Objectives</h3>
        {form.watch('objectives').map((_, index) => (
          <div key={index} className="flex items-start gap-2">
            <Input
              {...form.register(`objectives.${index}`)}
              className="flex-1"
              placeholder={`Objective ${index + 1}`}
            />
            {form.watch('objectives').length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeObjective(index)}
              >
                <Trash className="h-4 w-4 text-red-500" />
              </Button>
            )}
          </div>
    