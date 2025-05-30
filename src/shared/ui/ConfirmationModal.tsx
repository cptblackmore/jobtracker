import {
  alpha,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { focusElementById } from "@shared/lib";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { confirmationModalElementsIds } from "./ids/confirmationModalElementsIds";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  handleConfirm: () => void;
  confirmButtonText?: string;
  severity?: "warning" | "error";
  onExited?: () => void;
  ariaDescribedById?: string;
}

export const ConfirmationModal: React.FC<Props> = ({
  open,
  setOpen,
  children,
  handleConfirm,
  confirmButtonText = "ОК",
  severity = "warning",
  onExited,
  ariaDescribedById,
}) => {
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      fullScreen={!isSmUp}
      closeAfterTransition={false}
      onTransitionExited={onExited}
      sx={{
        "& .MuiDialog-paper": {
          px: isSmUp ? 0 : 2,
          py: isSmUp ? 0 : 4,
          ...(!isSmUp && {
            backgroundColor: alpha(theme.palette.background.default, 0.95),
            backdropFilter: "blur(1px)",
          }),
        },
      }}
      onTransitionEnter={() =>
        focusElementById(confirmationModalElementsIds.cancelButton)
      }
      aria-describedby={ariaDescribedById}
    >
      <DialogTitle>Внимание!</DialogTitle>
      <DialogContent>
        <DialogContentText id={ariaDescribedById}>{children}</DialogContentText>
      </DialogContent>
      <DialogActions
        sx={{
          flexDirection: !isSmUp ? "column" : "row",
          gap: 1,
          p: !isSmUp ? 2 : 3,
          "& > :not(:first-of-type)": { ml: 0 },
        }}
      >
        <Button
          id={confirmationModalElementsIds.cancelButton}
          fullWidth={!isSmUp}
          variant="contained"
          onClick={() => setOpen(false)}
        >
          Отмена
        </Button>
        <Button
          fullWidth={!isSmUp}
          variant="outlined"
          color={severity}
          onClick={handleConfirm}
        >
          {confirmButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
