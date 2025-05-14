import { Box } from "@mui/material";
import { pulseKeyframes } from "../animations/pulseKeyframes";

interface Props {
  success: boolean;
  size: number;
}

export const StatusCircle: React.FC<Props> = ({ success, size }) => (
  <Box
    component="span"
    sx={{
      width: 16 * size,
      height: 16 * size,
      borderRadius: "50%",
      backgroundColor: (theme) =>
        theme.palette[success ? "success" : "error"].main,
      animation: `${pulseKeyframes} 2s infinite ease-in-out`,
      ml: 1 * size,
      display: "inline-block",
    }}
  />
);
