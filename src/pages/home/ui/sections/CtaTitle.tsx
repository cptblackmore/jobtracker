import { Typography as T } from "@mui/material";

interface Props {
  title: string;
  id?: string;
}

export const CtaTitle: React.FC<Props> = ({ title, id }) => {
  return (
    <T
      id={id}
      component="h2"
      variant="h5"
      sx={(theme) => ({
        fontSize: {
          xs: "1.3rem",
          sm: { fontSize: theme.typography.h5.fontSize },
        },
        mb: {
          xs: 4,
          sm: 3,
        },
      })}
    >
      {title}
    </T>
  );
};
