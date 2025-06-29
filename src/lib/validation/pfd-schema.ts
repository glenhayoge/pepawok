// lib/validation/pfd-schema.ts
import { z } from 'zod';

// ===== Utility Schemas =====
const CostComponentSchema = z.object({
  category: z.enum(['CAPITAL_FORMATION', 'EQUIPMENT', 'CAPACITY_BUILDING', 'PERSONNEL', 'OTHERS']),
  fundingSource: z.string().min(1, "Funding source is required"),
  value: z.number().min(0, "Value must be positive")
});

const PolicyObjectiveSchema = z.object({
  objective: z.string().min(1, "Objective is required"),
  indicator: z.string().min(1, "Indicator is required"),
  baseline: z.string().min(1, "Baseline is required"),
  target: z.string().min(1, "Target is required")
});

const BeneficiarySchema = z.object({
  type: z.string().min(1, "Beneficiary type is required"),
  number: z.number().min(0, "Number must be positive")
});

const RiskSchema = z.object({
  assumption: z.string().min(1, "Assumption is required"),
  risk: z.string().min(1, "Risk description is required"),
  impact: z.enum(['HIGH', 'MEDIUM', 'LOW']),
  likelihood: z.enum(['HIGH', 'MEDIUM', 'LOW']),
  action: z.string().min(1, "Action is required")
});

// ===== Main PFD Schema =====
export const PFDSchema = z.object({
  // Section A: Project Proponent Information
  proponentInfo: z.object({
    originatingAgency: z.string().min(1, "Agency/organization is required"),
    contactName: z.string().min(1, "Contact name is required"),
    title: z.string().min(1, "Title is required"),
    address: z.string().min(1, "Address is required"),
    phone: z.string().min(1, "Phone is required"),
    email: z.string().email("Invalid email format")
  }),
  
  // Section B: Summary Information
  summaryInfo: z.object({
    title: z.string().min(1, "Project title is required"),
    sector: z.string().min(1, "Sector is required"),
    subSector: z.string().optional(),
    totalCost: z.number().min(0, "Total cost must be positive"),
    duration: z.string().min(1, "Duration is required"),
    location: z.string().min(1, "Location is required"),
    partners: z.string().optional(),
    costEstimate: z.array(CostComponentSchema).min(1, "At least one cost component is required")
  }),
  
  // Section C: Project Description
  projectDescription: z.object({
    sectorAnalysis: z.string().min(1, "Sector analysis is required"),
    projectStrategy: z.string().min(1, "Project strategy is required"),
    shortDescription: z.string().min(1, "Short description is required"),
    objectives: z.array(z.string()).min(1, "At least one objective is required"),
    components: z.array(z.string()).min(1, "At least one component is required"),
    sectorPlanObjectives: z.array(PolicyObjectiveSchema).optional(),
    projectObjectives: z.array(PolicyObjectiveSchema).min(1, "At least one project objective is required"),
    districtPlanObjectives: z.array(PolicyObjectiveSchema).optional()
  }),
  
  // Section D: Beneficiaries
  beneficiaries: z.object({
    directBeneficiaries: z.array(BeneficiarySchema).min(1, "At least one beneficiary type is required"),
    indirectBeneficiaries: z.array(BeneficiarySchema).optional(),
    marginalizedGroups: z.array(BeneficiarySchema).optional()
  }),
  
  // Section E: Participatory Approach
  participatoryApproach: z.object({
    identificationMethod: z.string().min(1, "Identification method is required"),
    stakeholdersInvolved: z.string().min(1, "Stakeholders involved are required")
  }),
  
  // Section F: Institutional Capacity
  institutionalCapacity: z.object({
    governanceMechanism: z.string().min(1, "Governance mechanism is required"),
    technicalStandards: z.string().optional()
  }),
  
  // Section G: Land Availability
  landAvailability: z.object({
    ownershipEvidence: z.string().min(1, "Ownership evidence is required"),
    availabilityDetails: z.string().min(1, "Availability details are required")
  }),
  
  // Section H: Economic Analysis
  economicAnalysis: z.object({
    feasibilityStudy: z.boolean(),
    irrPercentage: z.number().min(0, "IRR must be positive").optional(),
    costBenefitAnalysis: z.string().optional()
  }),
  
  // Section I: Sustainability
  sustainability: z.object({
    operationalCostCapacity: z.string().min(1, "Operational cost capacity is required"),
    technicalSupportPlan: z.string().min(1, "Technical support plan is required")
  }),
  
  // Section J: Social Safeguards
  socialSafeguards: z.object({
    hivAidsImpact: z.string().optional(),
    environmentalImpact: z.string().optional(),
    youthImpact: z.string().optional(),
    specialNeedsImpact: z.string().optional(),
    genderImpact: z.string().min(1, "Gender impact analysis is required")
  }),
  
  // Section K: Risk Management
  riskManagement: z.object({
    risks: z.array(RiskSchema).min(1, "At least one risk is required"),
    mitigationPlan: z.string().min(1, "Mitigation plan is required")
  }),
  
  // Section L: Monitoring & Evaluation
  monitoringEvaluation: z.object({
    monitoringMethods: z.array(z.string()).min(1, "At least one monitoring method is required"),
    evaluationSchedule: z.string().min(1, "Evaluation schedule is required")
  }),
  
  // Section M: Attachments
  attachments: z.object({
    logFrame: z.boolean(),
    riskManagementPlan: z.boolean(),
    financialAnalysis: z.boolean(),
    implementationSchedule: z.boolean(),
    costSchedule: z.boolean(),
    operationalExpenditure: z.boolean()
  })
});