import { Typography as T } from "@mui/material";

interface Props {
  id?: string;
  title: string;
}

export const CardHeaderTitle: React.FC<Props> = ({ id, title }) => {
  return (
    <T
      id={id}
      component="h2"
      variant="h6"
      sx={(theme) => ({
        fontSize: {
          xs: "1.2rem",
          sm: { fontSize: theme.typography.h6.fontSize },
        },
      })}
    >
      {title}
    </T>
  );
};
