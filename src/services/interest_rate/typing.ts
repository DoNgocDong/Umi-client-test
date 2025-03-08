export interface InterestRateInfo {
  interestRateId: string;
  rate: number;
  unit: Unit;
  interestGroup: Group;
  minimumTerm: number;
  maximumTerm: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface InterestRateDTO {
  rate: number;
  // unit: Unit;
  group: Group;
  minimumTerm?: number;
  maximumTerm?: number;
  isActive: boolean;
}

export enum Unit {
  DAY = 'DAY',
  MONTH = 'MONTH',
  YEAR = 'YEAR'
}

export enum Group {
  SAVING = 'SAVING',
  CREDIT = 'CREDIT'
}
