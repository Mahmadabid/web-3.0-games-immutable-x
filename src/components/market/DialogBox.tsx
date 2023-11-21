import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material"
import { red } from "@mui/material/colors"
import { ColorButton } from "../button/ColorButton"
import { DialogProps } from "//types/type"

const DialogBox: React.FC<DialogProps> = ({open, handleClose}) => {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Warning</DialogTitle>
            <DialogContent>
                <DialogContentText color={red[500]}>
                    Please keep the window open during purchase, otherwise you might lose funds.
                </DialogContentText>
            </DialogContent>
            <div className="items-center text-center">
                <DialogActions>
                    <ColorButton onClick={handleClose} autoFocus>
                        OK
                    </ColorButton>
                </DialogActions>
            </div>
        </Dialog>
    )
}

export default DialogBox