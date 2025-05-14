import { Autocomplete, FormControl, TextField, useTheme } from "@mui/material";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import { ChangeEvent } from "react";
import { filterLabelsMap } from "../model/filterLabelsMap";
import { Places, VacancyParams } from "@entities/Vacancy";
import { AriaInformer, ClearAdornment } from "@shared/ui";
import {
  getInputTypographyStyles,
  getHighlightedBorderStyle,
  getMenuItemStyle,
} from "./styles";

interface Props {
  place: string;
  suggestedPlaces: Places;
  handlePlaceInputChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  handlePlaceChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  formattedPlace: string;
  handleInvalid: () => void;
  highlightedFilters: Array<keyof VacancyParams["filters"]>;
}

export const PlaceFilter: React.FC<Props> = ({
  place,
  suggestedPlaces,
  handlePlaceInputChange,
  handlePlaceChange,
  formattedPlace,
  handleInvalid,
  highlightedFilters,
}) => {
  const theme = useTheme();

  return (
    <FormControl sx={{ flexGrow: 1 }}>
      <Autocomplete
        freeSolo
        disableClearable
        options={suggestedPlaces}
        getOptionLabel={(option) =>
          typeof option === "string" ? option : option.name
        }
        getOptionDisabled={(option) => !!option.isMeta}
        isOptionEqualToValue={(option, value) =>
          typeof option === "object" &&
          typeof value === "object" &&
          option.name === value.name
        }
        inputValue={place}
        filterOptions={(option) => option}
        onChange={(_, value) => {
          handlePlaceChange({
            target: { value },
          } as ChangeEvent<HTMLInputElement>);
        }}
        onInputChange={(_, value) =>
          handlePlaceInputChange({
            target: { value },
          } as ChangeEvent<HTMLInputElement>)
        }
        renderOption={(props, option) => {
          const matches = match(option.name, place);
          const parts = parse(option.name, matches);
          const { key, ...rest } = props;

          return (
            <li key={key} {...rest}>
              <div style={{ whiteSpace: "wrap" }}>
                {parts.map((part, index) => (
                  <span
                    key={index}
                    style={{
                      fontWeight: part.highlight ? 600 : 400,
                    }}
                  >
                    {part.text}
                  </span>
                ))}
              </div>
            </li>
          );
        }}
        slotProps={{
          listbox: {
            sx: {
              "& .MuiAutocomplete-option": getMenuItemStyle(theme),
            },
          },
        }}
        renderInput={(params) => (
          <>
            <TextField
              {...params}
              label={filterLabelsMap.place}
              size="small"
              onInvalid={handleInvalid}
              sx={{
                fieldset: {
                  transition: "border-color 0.2s",
                  ...getHighlightedBorderStyle(highlightedFilters, "place"),
                },
                ...getInputTypographyStyles(theme),
              }}
              slotProps={{
                input: {
                  ...params.InputProps,
                  type: "search",
                  endAdornment: (
                    <ClearAdornment
                      onClear={() =>
                        handlePlaceInputChange({
                          target: { value: "" },
                        } as ChangeEvent<HTMLInputElement>)
                      }
                      visible={!!place}
                    />
                  ),
                },
              }}
            />
            <input type="hidden" name="place" value={formattedPlace} />
            <AriaInformer>
              {place.length >= 3
                ? suggestedPlaces.length === 1 && suggestedPlaces[0].isMeta
                  ? "Мест не найдено"
                  : `Мест найдено: ${suggestedPlaces.length}`
                : "Введите от 3 символов для поиска мест"}
            </AriaInformer>
          </>
        )}
        sx={{
          input: {
            "&::-webkit-search-cancel-button": {
              appearance: "none",
              WebkitAppearance: "none",
            },
          },
        }}
      />
    </FormControl>
  );
};
