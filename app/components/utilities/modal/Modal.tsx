import React, { useState } from "react"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";

/**
 * This is a reusable alert dialog we can use across the app
 * 
 * @param title: string - The title of the modal
 * @param content: string | JSX.Element - The content of the modal
 * @param closeText: string - The text for the close button
 * @param acceptText?: string - The text for the accept button
 * @returns 
 */
export const Modal = ({ open, title, content, closeText = 'Close', acceptText }: {
  open: boolean,
  title: string,
  content: string | JSX.Element
  closeText: string
  acceptText?: string
}): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(open)
  const handleClose = () => setIsOpen(false)

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby={`alert-dialog-${title}`}
      aria-describedby={`alert-dialog-description${title}`}
    >
      <DialogTitle id={`alert-dialog-title-${title}`}>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id={`alert-dialog-content-${title}`}>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{closeText}</Button>
        {acceptText && <Button onClick={handleClose}>{acceptText}</Button>}
      </DialogActions>
    </Dialog>
  )
}