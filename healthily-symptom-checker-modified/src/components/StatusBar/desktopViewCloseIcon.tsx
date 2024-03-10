import CloseIcon from "../Question/AutoComplete/CloseIcon";
import { useState } from "react";
import { Modal } from "@nextui-org/react";
import { useRouter } from "next/router";
import { ExitButton, DesktopCloseIconContainer } from "./statusBar.styles";
import { Button } from "../Button";

const DesktopViewCloseIcon: React.FC = () => {
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
    <DesktopCloseIconContainer>
      <ExitButton onClick={handleExitClick}>
        <CloseIcon />
      </ExitButton>

      <Modal open={showModal} onClose={() => handleModalAction(false)}>
        <Modal.Body>Are you sure you want to end this consultation?</Modal.Body>
        <Modal.Footer>
          <Button onClick={() => handleModalAction(false)} light>
            Cancel
          </Button>
          <Button onClick={() => handleModalAction(true)}>
            End consultation
          </Button>
        </Modal.Footer>
      </Modal>
    </DesktopCloseIconContainer>
  );
};

export default DesktopViewCloseIcon;
