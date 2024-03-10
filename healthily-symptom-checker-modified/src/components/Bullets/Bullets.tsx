import { ReactNode } from "react";

import { UnorderedList } from "./bullets.styles";

const Bullets: React.FC<{
  children?: ReactNode;
}> = ({ children }) => {
  return <UnorderedList>{children}</UnorderedList>;
};

export default Bullets;
