import { APIResponse } from "@/types/api";
import Consultation from "./Consultation";
import { Header } from "../Header";

const Report: React.FC<{
  reportData: APIResponse;
  logo: string | undefined;
}> = ({ reportData, logo }) => {
  const { report } = reportData;
  return (
    <>
      <Header phase="Your report" percentage={0} logo={logo} />
      <Consultation report={report} />
    </>
  );
};

export default Report;
