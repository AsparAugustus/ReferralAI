import classNames from "classnames";
import { Element } from "./heading.styles";
import React, { ReactNode } from "react";

interface HeadingProps {
  children: ReactNode;
  as: string;
  kind: string;
  className?: string | undefined;
}

const Heading: React.FC<HeadingProps> = ({
  children,
  as,
  kind,
  className = undefined,
}) => {
  return (
    <Element
      as={as}
      kind={kind}
      className={classNames(className, {
        [kind]: kind,
      })}
    >
      {children}
    </Element>
  );
};

export default Heading;
