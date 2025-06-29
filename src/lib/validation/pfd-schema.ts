import { z } from 'zod';

const CostComponentSchema = z.object({
  category: z.enum(['CAPITAL_FORMATION', 'EQUIPMENT', 'CAPACITY_BUILDING', 'PERSONNEL', 'OTHERS']),
  fundingSource: z.string(),
  value: z.number().min(0),
});

export const PFDSchema = z.object({
  // Section A
  proponentInfo: z.object({
    originatingAgency: z.string().min(1),
    contactName: z.string().min(1),
    title: z.string().min(1),
    address: z.string().min(1),
    phone: z.string().min(1),
    email: z.string().email(),
  }),
  
  // Section B
  summaryInfo: z.object({
    title: z.string().min(1),
    sector: z.string().min(1),
    subSector: z.string().min(1),
    totalCost: z.number().min(0),
    duration: z.string().min(1),
    location: z.string().min(1),
    partners: z.string().optional(),
    costEstimate: z.array(CostComponentSchema),
  }),
  
  // ... other sections
});