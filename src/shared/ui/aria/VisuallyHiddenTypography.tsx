import { Typography as T } from "@mui/material";
import React, { ReactNode } from "react";

interface Props extends React.HTMLAttributes<HTMLHeadingElement> {
  variant?: "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  id?: string;
  children: ReactNode;
}

export const VisuallyHiddenTypography: React.FC<Props> = ({
  variant = "h2",
  id,
  children,
}) => {
  return (
    <T
      component={variant}
      id={id}
      sx={{
        position: "absolute",
        width: "1px",
        height: "1px",
        padding: 0,
        margin: "-1px",
        overflow: "hidden",
        clip: "rect(0, 0, 0, 0)",
        whiteSpace: "nowrap",
        border: 0,
      }}
    >
      {children}
    </T>
  );
};
