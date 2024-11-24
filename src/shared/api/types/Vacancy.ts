export type Vacancy = {
  profession: string;
  firmName: string;
  town: string
  description: string;
  source: string;
  paymentFrom?: number;
  paymentTo?: number;
  currency: string;
  link: string;
  datePublished: number;
}
