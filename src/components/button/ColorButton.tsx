import { styled, Button } from "@mui/material";
import { purple } from "@mui/material/colors";

export const ColorButton = styled(Button)(({ theme }) => ({
    color: `${theme.palette.getContrastText(purple[500])} !important`,
    backgroundColor: `${purple[500]} !important`,
    "&:hover": {
        backgroundColor: `${purple[700]} !important`,
    },
    "&.Mui-disabled": {
        backgroundColor: "#E0E0E0 !important",
        color: "#8C8C8C !important",
    },
}));
