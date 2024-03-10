import Image from "next/image";
import { LogoContainer } from "./logo.styles";

const Logo: React.FC<{ logo: string }> = ({ logo }) => {
  return (
    <LogoContainer>
      <Image src={logo} alt="Logo" width={150} height={50} />
    </LogoContainer>
  );
};

export default Logo;
