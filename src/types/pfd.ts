export type CostComponent = {
    id: string; // Unique identifier for each row
    category: CostCategory;
    fundingSource: string;
    value: number;
  };
  
  export type CostCategory = 
    | 'CAPITAL_FORMATION'
    | 'EQUIPMENT'
    | 'CAPACITY_BUILDING'
    | 'PERSONNEL'
    | 'OTHERS';