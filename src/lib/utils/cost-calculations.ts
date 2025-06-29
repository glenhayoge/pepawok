
import { CostComponent } from '@/types/pfd';

// Define cost categories with proper typing
export const COST_CATEGORIES = [
  'CAPITAL_FORMATION',
  'EQUIPMENT',
  'CAPACITY_BUILDING',
  'PERSONNEL',
  'OTHERS'
] as const;
export type CostCategory = typeof COST_CATEGORIES[number];

// Calculate total cost with validation
export const calculateTotalCost = (costEstimate: CostComponent[]): number => {
  if (!Array.isArray(costEstimate)) {
    console.error('Invalid costEstimate input', costEstimate);
    return 0;
  }
  
  return costEstimate.reduce((sum, item) => {
    const value = Number(item.value);
    return isNaN(value) ? sum : sum + value;
  }, 0);
};

// Get category total with type safety
export const getCategoryTotal = (
  costEstimate: CostComponent[], 
  category: CostCategory
): number => {
  return costEstimate
    .filter(item => item.category === category)
    .reduce((sum, item) => {
      const value = Number(item.value);
      return isNaN(value) ? sum : sum + value;
    }, 0);
};

// Get summary by category
export const getCostSummary = (costEstimate: CostComponent[]) => {
  return COST_CATEGORIES.map(category => ({
    category,
    total: getCategoryTotal(costEstimate, category)
  }));
};

// Format currency for Papua New Guinea
export const formatPGK = (value: number): string => {
  return new Intl.NumberFormat('en-PG', {
    style: 'currency',
    currency: 'PGK',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};

// Default cost components with type safety
export const DEFAULT_COST_COMPONENTS: CostComponent[] = COST_CATEGORIES.map(category => ({
  id: Math.random().toString(36).substr(2, 9), // Unique ID for each row
  category,
  fundingSource: '',
  value: 0
}));

// Validate cost components
export const validateCostEstimate = (costEstimate: CostComponent[]) => {
  const errors: string[] = [];
  
  // Check for at least one non-zero cost component
  const hasNonZero = costEstimate.some(item => Number(item.value) > 0);
  if (!hasNonZero) {
    errors.push('At least one cost component must have a value greater than zero');
  }
  
  // Check for negative values
  const hasNegative = costEstimate.some(item => Number(item.value) < 0);
  if (hasNegative) {
    errors.push('Cost values cannot be negative');
  }
  
  // Check for valid funding sources in non-zero components
  costEstimate.forEach(item => {
    if (Number(item.value) > 0 && !item.fundingSource.trim()) {
      errors.push(`Funding source is required for ${item.category}`);
    }
  });
  
  return errors;
};