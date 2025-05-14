import { Button, ButtonProps, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

interface Props extends ButtonProps {
  children: React.ReactNode;
  cooldown: number;
  stateless?: boolean;
  onClick?: () => unknown;
  onCooldownEnd?: () => unknown;
}

export const CooldownButton: React.FC<Props> = ({
  children,
  cooldown,
  stateless = false,
  onClick,
  onCooldownEnd,
  ...props
}) => {
  const [timeLeft, setTimeLeft] = useState(stateless ? 0 : cooldown);
  const [isDisabledBeforeCountdown, setIsDisabledBeforeCountdown] =
    useState(false);

  useEffect(() => {
    if (!stateless) setTimeLeft(cooldown);
  }, [cooldown]);

  useEffect(() => {
    if (timeLeft === 0) return;
    if (isDisabledBeforeCountdown) setIsDisabledBeforeCountdown(false);
    const timeout = setTimeout(() => {
      if (timeLeft === 1 && onCooldownEnd) onCooldownEnd();
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [timeLeft]);

  const handleClick = () => {
    if (onClick) onClick();
    setIsDisabledBeforeCountdown(true);
    setTimeout(() => setIsDisabledBeforeCountdown(false), 5000);
    setTimeLeft(cooldown);
  };

  return (
    <Button
      {...props}
      onClick={handleClick}
      disabled={timeLeft > 0 || isDisabledBeforeCountdown}
      endIcon={
        isDisabledBeforeCountdown && (
          <CircularProgress size={15} color="inherit" />
        )
      }
    >
      {timeLeft > 0 ? `Подождите ${timeLeft} сек.` : children}
    </Button>
  );
};
