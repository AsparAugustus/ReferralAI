import { useEffect, useState } from "react";

import { APIResponse, Article } from "@/types/api";
import Articles from "./Article";
import Heading from "../Heading";
import Cause from "./Cause";
import Summary from "./Summary";
import DateTime from "../DateTime";
import ConsultationInfoBox from "./ConsultationInfoBox";
import { Button } from "../Button";
import {
  ArticleContainer,
  BackImage,
  ButtonContainer,
  ReportHeader,
  Wrapper,
} from "./report.styles";
import CauseArticle from "./CauseArticle";

import Back from "../../media/back-icon.svg";
import { useRouter } from "next/router";
import { openInNewTab } from "@/utils/link";

const API_ENDPOINT = "http://127.0.0.1:5000"

const Consultation: React.FC<{
  report: APIResponse["report"];
}> = ({ report }) => {
  const summary = report?.summary;

  console.log(summary, "summary")

  const summaryCopy = JSON.parse(JSON.stringify(summary));


//    if (summaryCopy?.articles !== undefined) {
//   delete summaryCopy.articles;
// }

//   if (summaryCopy?.hasOwnProperty('articles_v3')) {
//       delete summaryCopy.articles_v3;
//   }

  useEffect(() => {

  // Function to send the POST request
  const sendPostRequest = async () => {

      try {
        const dataToPost = {  // Create an object to hold the data
          medical_info: summaryCopy, // Assign summary value to the 'trololo' property
        };
  
        const response = await fetch(API_ENDPOINT + '/services', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // Adjust content type if needed
          },
          body: JSON.stringify(dataToPost),
        });
  
        if (!response.ok) {
          throw new Error(`POST request failed with status ${response.status}`);
        }



  
        // Handle successful response (optional)
        console.log('POST request successful')

        const actual_response = await response.json()

        console.log(actual_response, "actual_responseactual_response")

        setLocations(actual_response?.services_suitable)
        setLoaded(true)

        console.log(actual_response?.services_suitable, "response here")
      } catch (error) {
        console.error('Error sending POST request:', error);
      }
    };
  
  

    (async function() {
      try {
              // Check if summary has data before sending the request
      if (summaryCopy) {
        const req_response = await sendPostRequest();


        
      }

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    })();

  }, [summaryCopy])


  const [hasLoaded, setLoaded] = useState(false)
  const [useLocations, setLocations] = useState(null)

  console.log(summaryCopy, "summaryCopy")

  if (!summary) return;

  const {
    articles_v3: articles = [],
    consultation_triage,
    extracted_symptoms,
    additional_symptoms,
    negative_symptoms,
    duration,
    user_profile,
    influencing_factors,
  } = summary;

  const router = useRouter();
  const [showCause, setShowCause] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article>();
  const [selectedArticleIndex, setSelectedArticleIndex] = useState<number>();
  const [dateTime, setDateTime] = useState<number | undefined>();

  useEffect(() => {
    setDateTime(Date.now());
  }, []);

  const [componentLoaded, setComponentLoaded] = useState(false);

  // This component was throwing a hydration error relating
  // to next/image component. With more time I'd fix it
  // but this is a workaround given tight deadlines
  useEffect(() => {
    setComponentLoaded(true);
  }, []);

  const handleArticleClick = (selectedArticleIndex: number) => {
    setShowCause(true);
    setSelectedArticleIndex(selectedArticleIndex);
    setSelectedArticle(articles[selectedArticleIndex]);
  };



  interface BoxProps<T = any> {
    items: T[];
  }
  
  const GenericBox = ({ items }: BoxProps) => {
    return (
      <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', width: '100%' }}>
        <h2>Related services: </h2>
        <h3>{items}</h3>
      </div>
    );
  };
  

  return (
    <Wrapper>
      {componentLoaded && (
        <>
          <ReportHeader>
            <Heading as="h1" kind="heading">
              Your report
            </Heading>
            <DateTime dateTime={dateTime} />
          </ReportHeader>
          {showCause && (
            <BackImage
              src={Back}
              alt="Go back"
              onClick={() => setShowCause(false)}
            />
          )}
          {showCause ? (
            <Cause article={selectedArticle} index={selectedArticleIndex} />
          ) : (
            <>
              {!!articles.length && (
                <>
                  <Heading kind="heading" as="h2">
                    Possible Causes
                  </Heading>
                  <Articles articles={articles} onClick={handleArticleClick} />
                </>
              )}
            </>
          )}
          {showCause && selectedArticle && (
            <>
              <Heading as="h3" kind="heading">
                Useful reading
              </Heading>
              <CauseArticle article={selectedArticle} />
            </>
          )}

            {componentLoaded && (
              <GenericBox items={useLocations} />
            )}
          

          {consultation_triage && !showCause && (
            <>
              <Heading kind="heading" as="h2">
                Summary
              </Heading>
              <Summary level={consultation_triage.level}>
                {consultation_triage.triage_advice}
              </Summary>
            </>
          )}

          {!showCause && (
            <>
              <ConsultationInfoBox
                positiveSymptoms={[
                  ...extracted_symptoms,
                  ...additional_symptoms,
                ]}
                negativeSymptoms={negative_symptoms}
                duration={duration}
                userProfile={user_profile}
                influencingFactors={influencing_factors}
              />
              <ButtonContainer>
                <Button
                  onClick={() =>
                    openInNewTab("https://www.livehealthily.com/legal/safe-use")
                  }
                  fullWidth
                  light
                >
                  How to use Healthily safely
                </Button>

                <Button onClick={() => router.reload()} fullWidth>
                  Start a new consultation
                </Button>
              </ButtonContainer>
              <ArticleContainer className="dark">
                <span>
                  The suggested next steps are base on a group of people with
                  similar characteristics such as your age, sex and health
                  background, who are generally healthy and don’t suffer from
                  any chronic or rare medical conditions. Healthily can’t
                  consider all the information a doctor can, and is not able to
                  identify all conditions or symptoms.
                </span>
              </ArticleContainer>
            </>
          )}

          {showCause && (
            <ButtonContainer>
              {/*<Button
                onClick={() =>
                  openInNewTab("https://www.livehealthily.com/app")
                }
                fullWidth
                light
              >
                Track your symptoms
              </Button>*/}

              <Button onClick={() => router.reload()} fullWidth>
                That's all, thanks
              </Button>
            </ButtonContainer>
          )}
        </>
      )}
    </Wrapper>
  );
};

export default Consultation;
