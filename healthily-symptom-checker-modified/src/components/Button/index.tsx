import { ReactNode } from "react";
import { Button as StyledButton } from "./button.styles";
import classNames from "classnames";

interface ButtonProps {
  children: ReactNode;
  disabled?: boolean;
  onClick: () => void;
  className?: string;
  fullWidth?: boolean;
  light?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  disabled = false,
  onClick,
  className,
  fullWidth,
  light,
}) => {
  return (
    <StyledButton
      disabled={disabled}
      onClick={onClick}
      className={classNames(className, {
        "full-width": fullWidth,
        light,
      })}
    >
      {children}
    </StyledButton>
  );
};
