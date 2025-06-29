// app/pfd/new/section-b/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SectionBSchema, CostComponentSchema } from '@/lib/validation/pfd-schema';
import { calculateTotalCost } from '@/lib/utils/cost-calculations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import NavigationControls from '@/components/wizard/navigation-controls';
import { useWizard } from '@/context/wizard-context';
import { Plus, Trash } from 'lucide-react';

export default function SectionB() {
  const { formData, updateFormData, nextStep } = useWizard();
  const [totalCost, setTotalCost] = useState(0);
  
  const form = useForm({
    resolver: zodResolver(SectionBSchema),
    defaultValues: formData.summaryInfo || {
      title: '',
      sector: '',
      subSector: '',
      duration: '',
      location: '',
      partners: '',
      costEstimate: DEFAULT_COST_COMPONENTS,
      totalCost: 0
    }
  });

  // Watch costEstimate for changes
  const costEstimate = form.watch('costEstimate', []);

  // Recalculate total when costEstimate changes
  useEffect(() => {
    const newTotal = calculateTotalCost(costEstimate);
    setTotalCost(newTotal);
    form.setValue('totalCost', newTotal);
  }, [costEstimate, form]);

  const onSubmit = (data) => {
    updateFormData({ summaryInfo: data });
    nextStep();
  };

  const addCostComponent = () => {
    const newComponent = { category: 'CAPITAL_FORMATION', fundingSource: '', value: 0 };
    form.setValue('costEstimate', [...costEstimate, newComponent]);
  };

  const removeCostComponent = (index) => {
    const updated = [...costEstimate];
    updated.splice(index, 1);
    form.setValue('costEstimate', updated);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-xl font-semibold">Summary Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Programme/Project Title"
          {...form.register('title')}
          error={form.formState.errors.title}
        />
        <Input
          label="Sector"
          {...form.register('sector')}
          error={form.formState.errors.sector}
        />
        <Input
          label="Sub-Sector"
          {...form.register('subSector')}
          error={form.formState.errors.subSector}
        />
        <Input
          label="Duration (approx.)"
          {...form.register('duration')}
          error={form.formState.errors.duration}
        />
        <Input
          label="Location (province, district, town)"
          {...form.register('location')}
          error={form.formState.errors.location}
        />
        <Input
          label="Supporting Partners"
          {...form.register('partners')}
          error={form.formState.errors.partners}
        />
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-medium mb-3">Summary Estimate of Costs (PGK)</h3>
        
        <Table className="border">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Cost Components</TableHead>
              <TableHead>Funding Source</TableHead>
              <TableHead className="text-right w-[150px]">Value (PGK)</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {costEstimate.map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <select
                    {...form.register(`costEstimate.${index}.category`)}
                    className="w-full p-2 border rounded"
                  >
                    <option value="CAPITAL_FORMATION">Capital Formation</option>
                    <option value="EQUIPMENT">Equipment</option>
                    <option value="CAPACITY_BUILDING">Capacity Building</option>
                    <option value="PERSONNEL">Personnel</option>
                    <option value="OTHERS">Others</option>
                  </select>
                </TableCell>
                <TableCell>
                  <Input
                    {...form.register(`costEstimate.${index}.fundingSource`)}
                    error={form.formState.errors.costEstimate?.[index]?.fundingSource}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    {...form.register(`costEstimate.${index}.value`, { valueAsNumber: true })}
                    error={form.formState.errors.costEstimate?.[index]?.value}
                  />
                </TableCell>
                <TableCell className="text-center">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeCostComponent(index)}
                  >
                    <Trash className="h-4 w-4 text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                <Button
                  type="button"
                  variant="outline"
                  onClick={addCostComponent}
                  className="mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Cost Component
                </Button>
              </TableCell>
            </TableRow>
            <TableRow className="bg-gray-50 font-semibold">
              <TableCell colSpan={2}>Total Cost</TableCell>
              <TableCell className="text-right">
                {totalCost.toLocaleString('en-PG', {
                  style: 'currency',
                  currency: 'PGK',
                  minimumFractionDigits: 2
                })}
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <NavigationControls />
    </form>
  );
}