import { sourcesRegistry, Sources } from "@entities/Vacancy";
import { lighten } from "@mui/material";
import { ThemesContext } from "@shared/ui";
import { useContext } from "react";

interface Props {
  source: Sources;
  reverse?: boolean;
  size?: number;
  gap?: number;
}

export const VacancySource: React.FC<Props> = ({
  source,
  reverse,
  size = 1,
  gap = 1,
}) => {
  const styles = sourcesRegistry[source].styles;
  const { themeMode } = useContext(ThemesContext);

  return (
    <span
      css={{
        display: "flex",
        flexDirection: reverse ? "row-reverse" : "row",
        justifyContent: reverse ? "flex-end" : "flex-start",
        alignItems: "center",
        gap: `${gap * 0.3}em`,
        color:
          themeMode === "light" ? styles.color : lighten(styles.color, 0.5),
        fontSize: `${size}em`,
      }}
      aria-label={`Источник ${styles.name}`}
    >
      {styles.name}
      <img
        src={styles.icon}
        css={{ width: "1.1em", height: "1.1em", filter: "brightness(1.2)" }}
      />
    </span>
  );
};
