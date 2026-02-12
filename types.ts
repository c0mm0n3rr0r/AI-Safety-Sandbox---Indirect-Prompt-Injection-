export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  isAdversarial?: boolean;
}

export interface IntentMandate {
  maxPrice: number;
  category: string;
  currency: string;
  requiredFeatures: string[]; // AP2 Constraint: Must have these attributes
  expiryTime: number;         // AP2 Security: Mandate expires after this time
}

export interface SearchRecord {
  id: string;
  query: string;
  results: {
    id: string;
    name: string;
    price: number;
  }[];
  timestamp: Date;
}

export interface LogEntry {
  id: string;
  timestamp: Date;
  actor: 'User' | 'System' | 'Agent' | 'Tool';
  type: 'info' | 'action' | 'error' | 'success' | 'warning';
  message: string;
  details?: string;
}

export enum SimulationState {
  IDLE = 'IDLE',
  RUNNING = 'RUNNING',
  SUCCESS = 'SUCCESS', // Purchase made and valid
  FAILURE = 'FAILURE', // Purchase made but bad outcome (technically valid mandate)
  ERROR = 'ERROR' // System error or mandate violation
}

export interface Scenario {
  id: string;
  name: string;
  userIntent: string;
  mandate: IntentMandate;
  products: Product[]; // The base product set (clean)
  defaultAdversarialProduct: Product; // The product that replaces its clean counterpart in adversarial mode (default text)
}

export type InjectionStyle = 'persuasive' | 'social_proof' | 'value_reframing' | 'authority_adjacent' | 'comparative' | 'urgency';

export interface InjectionConfig {
  styles: InjectionStyle[];
  intensity: 'low' | 'medium' | 'high';
  guidance: string;
}