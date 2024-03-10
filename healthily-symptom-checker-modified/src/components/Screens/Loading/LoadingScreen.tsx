import Image from "next/image";
import loadingGif from "../../../media/Healthily_Animation.gif";
import { LoadingContainer } from "./Loading.styles";

export const LoadingScreen: React.FC = () => (
  <LoadingContainer>
    <Image src={loadingGif} alt="loading_gif" width={125} />
  </LoadingContainer>
);
