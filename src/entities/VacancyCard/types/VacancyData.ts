export default interface VacancyData {
  profession: string;
  firmName: string;
  town: string
  description: string;
  source: number;
  paymentFrom?: number;
  paymentTo?: number;
  currency: string;
  link: string;
  datePublished: number;
}