import Button from "@mui/material/Button";
import { Modal } from "../utilities/modal/Modal";

export const BirthdayError = (): JSX.Element =>
  <Modal
    open
    title="Sorry, we couldn't fetch any Birthdays!"
    closeText="Close"
    closeAction={() => location.reload()}
    content={`Something went wrong our side 😔. Please refresh & try again later.`}
  />