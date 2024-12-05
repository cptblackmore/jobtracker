export type Vacancy = {
  id: string;
  profession: string;
  firmName: string;
  town: string
  description: string;
  source: string;
  paymentFrom?: number | null | undefined;
  paymentTo?: number | null | undefined;
  currency: string;
  link: string;
  datePublished: number;
  isFavorite: boolean;
}
