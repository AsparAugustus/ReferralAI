import { Button } from "@/components/Button";
import {
  AppContainer,
  CenteringDiv,
} from "@/components/Display/display.styles";
import Heading from "@/components/Heading";
import { ButtonContainer } from "@/components/Report/report.styles";
import { useRouter } from "next/router";

export default function Custom404() {
  const router = useRouter();

  return (
    <CenteringDiv>
      <AppContainer>
        <Heading as="h1" kind="heading">
          404 - Page Not Found
        </Heading>
        <ButtonContainer>
          <Button onClick={() => router.push("/")} fullWidth>
            Start a new symptom checker
          </Button>
        </ButtonContainer>
      </AppContainer>
    </CenteringDiv>
  );
}
