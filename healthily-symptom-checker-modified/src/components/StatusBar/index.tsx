import CloseIcon from "../Question/AutoComplete/CloseIcon";
import { useState } from "react";
import { Modal } from "@nextui-org/react";
import { useRouter } from "next/router";
import {
  ExitButton,
  ProgressBar,
  ProgressBarWrapper,
  StatusBarInner,
  StatusBarTitle,
  StatusBarWrapper,
  ExitButtonContainer,
} from "./statusBar.styles";
import { Button } from "../Button";

interface StatusBarProps {
  phase?: string;
  percentage?: number;
}

const StatusBar: React.FC<StatusBarProps> = ({
  phase = "",
  percentage = 0,
}) => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const handleExitClick = () => {
    setShowModal(true);
  };

  const handleModalAction = (confirmed: boolean) => {
    if (confirmed) {
      router.reload();
    }
    setShowModal(false);
  };

  return (
    <StatusBarWrapper>
      <StatusBarInner>
        <StatusBarTitle>{phase}</StatusBarTitle>
        {percentage > 0 && (
          <ProgressBarWrapper>
            <ProgressBar percentage={percentage} />
          </ProgressBarWrapper>
        )}

        <ExitButtonContainer>
          <ExitButton onClick={handleExitClick}>
            <CloseIcon />
          </ExitButton>

          <Modal
            style={{ fontFamily: "Libre Franklin, sans-serif" }}
            open={showModal}
            onClose={() => handleModalAction(false)}
          >
            <Modal.Body>
              Are you sure you want to end this consultation?
            </Modal.Body>
            <Modal.Footer>
              <Button
                onClick={() => handleModalAction(false)}
                light
              >
                Cancel
              </Button>
              <Button onClick={() => handleModalAction(true)}>
                End consultation
              </Button>
            </Modal.Footer>
          </Modal>
        </ExitButtonContainer>
      </StatusBarInner>
    </StatusBarWrapper>
  );
};

export default StatusBar;
