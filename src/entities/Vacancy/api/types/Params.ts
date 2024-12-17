export interface SuperjobParams {
  page: number;
  count: number;
  keyword: string;
  payment_from: number | null;
  payment_to: number | null;
  no_agreement: 0 | 1;
  period: number;
}

export interface HHParams {
  page: number;
  count: number;
  text: string;
  salary: number | null;
  period: number;
}

export interface TrudvsemParams {
  offset: number;
  limit: number;
  text: string;
}
