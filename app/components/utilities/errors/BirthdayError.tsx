import Button from "@mui/material/Button";
import { Modal } from "../modal/Modal";

export const BirthdayError = (): JSX.Element =>
  <>
    <Modal
      open
      title="Sorry, we couldn't fetch any Birthdays!"
      closeText="Close"
      content={`Something went wrong our side 😔. Please refresh & try again later.`}
    />
    <Button
      className="!bg-red-600 hover:!bg-lime-950"
      variant="contained"
      onClick={() => location.reload()}>
      Refresh Page
    </Button>
  </>