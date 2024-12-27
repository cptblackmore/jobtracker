export interface SuperjobParams {
  page: number;
  count: number;
  keyword: string;
  payment_from: number | null;
  payment_to: number | null;
  no_agreement: 0 | 1;
  period: 0 | 1 | 3 | 7;
}

export interface HHParams {
  page: number;
  per_page: number;
  text: string;
  salary: number | null;
  only_with_salary: boolean;
  period: 99 | 1 | 3 | 7;
}

export interface TrudvsemParams {
  offset: number;
  limit: number;
  text: string;
}
