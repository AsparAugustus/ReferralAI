import { getAccessToken } from "@utils/session-manager";
import { useState } from "react";
import LegalScreen from "@/components/Screens/Legal/Legal";
import {
  AppContainer,
  CenteringDiv,
  DesktopBorderDiv,
  StatusBarDiv,
} from "@/components/Display/display.styles";
import DesktopViewCloseIcon from "@/components/StatusBar/desktopViewCloseIcon";
import Display from "@/components/Display";

export default function Home({ token, query }: { token: string; query: {} }) {
  const [legalAgreed, setLegalAgreed] = useState(false);

  const handleConfirmLegal = () => setLegalAgreed(true);

  return (
    <>
      <StatusBarDiv />
      <CenteringDiv>
        <DesktopBorderDiv>
          <DesktopViewCloseIcon />
          {!legalAgreed ? (
            <AppContainer>
              <LegalScreen confirmLegal={handleConfirmLegal} query={query} />
            </AppContainer>
          ) : (
            <AppContainer>
              <Display token={token} query={query} />
            </AppContainer>
          )}
        </DesktopBorderDiv>
      </CenteringDiv>
    </>
  );
}

export async function getServerSideProps({ query }: { query: any }) {
  const token = await getAccessToken();
  return {
    props: {
      token,
      query,
    },
  };
}
