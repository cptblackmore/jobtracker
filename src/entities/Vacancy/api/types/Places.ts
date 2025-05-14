import { SourceId } from "@entities/Vacancy/model/Sources";

interface PlaceBase {
  id: string;
  name: string;
  type: "city" | "region";
  isMeta?: boolean;
}

export type Place = PlaceBase & Partial<Record<SourceId, string>>;

export type Places = Place[];
