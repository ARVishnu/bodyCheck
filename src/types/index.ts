export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'physician' | 'nurse';
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female';
  examDate: string;
  agatstonScore: number;
  cardiothoracicRatio: number;
  highRiskLevel: 'Low' | 'Moderate' | 'High' | 'Very High';
  knownCVD: 'Yes' | 'No';
  crmStatus: 'Needs Review' | 'No Review Needed' | 'PCP and Patient Notified' | 'Appointment Scheduled';
  notes?: string;
  CACScore:number;
  AACScore:number;
  TACScore:number;
  AANCScore:number;
  MACScore:number;
  AVLCScore:number;
}

export interface Report {
  id: string;
  patientId: string;
  scanDate: string;
  agatstonBreakdown: {
    LAD: number;
    RCA: number;
    LCX: number;
    LM: number;
    total: number;
  };
  aiSummary: string;
  clinicalInterpretation: string;
  riskBand: string;
}