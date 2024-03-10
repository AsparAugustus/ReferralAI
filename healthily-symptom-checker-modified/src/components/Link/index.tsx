import { ReactNode } from "react";
import { Element, LinkContainer } from "./link.styles";
import classNames from "classnames";

const Link: React.FC<{
  children: ReactNode;
  href?: string;
  target?: string;
  className?: string;
  inline?: boolean;
}> = ({
  children,
  href = "",
  target = "_blank",
  className,
  inline,
  ...props
}) => {
  return (
    <LinkContainer className={classNames({ inline })}>
      <Element
        href={href}
        target={target}
        className={classNames(className)}
        {...props}
      >
        {children}
      </Element>
    </LinkContainer>
  );
};

export default Link;
