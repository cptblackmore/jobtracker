import { formatPlace, parseFormattedPlace, Place, Places, PlacesService } from "@entities/Vacancy";
import { debounce } from "@mui/material";
import { ChangeEvent, useCallback, useMemo, useState } from "react";

export const usePlaceFilter = () => {
  const [place, setPlace] = useState("");
  const [suggestedPlaces, setSuggestedPlaces] = useState<Places>([]);
  const [formattedPlace, setFormattedPlace] = useState<string>("");

  const debouncedPlacesRequest = useMemo(
    () =>
      debounce(async (newPlace: string) => {
        try {
          const foundPlaces = await PlacesService.getPlaces(
            newPlace,
            new AbortController().signal,
          );
          if (foundPlaces.data.length) {
            setSuggestedPlaces(foundPlaces.data);
          } else {
            setSuggestedPlaces([
              { id: "", name: "Мест не найдено", type: "city", isMeta: true },
            ]);
          }
        } catch {
          setSuggestedPlaces([
            { id: "", name: "Мест не найдено", type: "city", isMeta: true },
          ]);
        }
      }, 600),
    [],
  );

  function deleteMetaPlaces() {
    setSuggestedPlaces(suggestedPlaces.filter((place) => !place.isMeta));
  }

  const matchAndSetFormattedPlace = useCallback(
    (newPlace: string | Place) => {
    if (typeof newPlace === "string") {
      const matched = suggestedPlaces.find(
        (place) => place.name.toLowerCase() === newPlace.toLowerCase(),
      );
      if (matched) {
        setFormattedPlace(formatPlace(matched));
      } else if (newPlace !== parseFormattedPlace(formattedPlace).name) {
        setFormattedPlace(newPlace);
      }
    } else {
      setFormattedPlace(formatPlace(newPlace));
    }
  },
  [formattedPlace, suggestedPlaces],
  );

  const handlePlaceInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const newPlace = e.target.value;
      matchAndSetFormattedPlace(newPlace);
      setPlace(newPlace);
      if (newPlace.length >= 3) {
        debouncedPlacesRequest(newPlace);
      } else {
        deleteMetaPlaces();
        debouncedPlacesRequest.clear();
      }
    },
    [debouncedPlacesRequest, matchAndSetFormattedPlace],
  );

  const handlePlaceChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const newPlace = e.target.value as string | Place;
      matchAndSetFormattedPlace(newPlace);
    },
    [matchAndSetFormattedPlace],
  );

  function resetPlace() {
    setPlace("");
  }

  return {
    place,
    resetPlace,
    setPlace,
    handlePlaceInputChange,
    handlePlaceChange,
    suggestedPlaces,
    formattedPlace,
    setFormattedPlace,
  };
};
