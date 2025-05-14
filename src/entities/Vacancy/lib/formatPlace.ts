import { Place } from "../api/types/Places";

export const formatPlace = (place: Place) => {
  return `${place.name}:${place.type === "city" ? "c" : "r"}${place.id}`;
};
