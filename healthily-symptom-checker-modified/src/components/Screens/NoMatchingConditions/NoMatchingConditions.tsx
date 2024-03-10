import { APIResponse } from "@/types/api";
import Image from "next/image";
import Link from "next/link";
import openLink from "../../../media/open-link.svg";
import {
  ArticleName,
  ConditionContainer,
  TitleDiv,
} from "./NoMatchingContitions.styles";
import ButtonBar from "@/components/Button/ButtonBar";
import { useRouter } from "next/router";

type NoMatchingConditionsProps = {
  chatResponse: APIResponse;
};

const NoMatchingConditions: React.FC<NoMatchingConditionsProps> = ({
  chatResponse,
}) => {
  const router = useRouter();
  const articles = chatResponse.report?.articles || [];
  return (
    <>
      {articles.map((article) => (
        <ConditionContainer>
          <Link href={article.urls.web} target="_blank">
            <TitleDiv>
              <ArticleName>{article.name}</ArticleName>
              <Image src={openLink} alt="open-link" width="15" />
            </TitleDiv>
            <p>{article.snippet}</p>
          </Link>
        </ConditionContainer>
      ))}
      <ButtonBar
        buttonText="Start over"
        onClick={() => router.reload()}
        disabled={false}
      />
    </>
  );
};

export default NoMatchingConditions;
