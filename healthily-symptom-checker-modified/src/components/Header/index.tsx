import { StickyHeader } from "../Display/display.styles";
import Logo from "../Logo";
import StatusBar from "../StatusBar";

export const Header: React.FC<{
  phase: string;
  percentage: number;
  logo: string | undefined;
}> = ({ phase, percentage = 0, logo }) => (
  <>
    <StickyHeader>
      <StatusBar phase={phase} percentage={percentage} />
    </StickyHeader>
    {logo && <Logo logo={logo} />}
  </>
);
