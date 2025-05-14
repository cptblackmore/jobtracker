import { Place } from "../api/types/Places";

export const parseFormattedPlace = (
  formattedPlace: string | undefined,
): Partial<Place> => {
  if (!formattedPlace) return { name: "" };

  const [name, formattedId] = formattedPlace.split(":");
  const type: Place["type"] | undefined = formattedId
    ? formattedId[0] === "c"
      ? "city"
      : "region"
    : undefined;
  const id = formattedId ? formattedId.slice(1) : undefined;
  return { name, type, id };
};
