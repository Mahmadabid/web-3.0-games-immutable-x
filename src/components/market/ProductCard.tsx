import React, { useState } from "react";
import {
    Card,
    CardContent,
    Typography,
} from "@mui/material";
import { ProductCardProps } from "//types/type";
import { ColorButton } from "../button/ColorButton";
import DialogBox from "./DialogBox";

const ProductCard: React.FC<ProductCardProps> = ({
    heading,
    price,
    image,
    setBuy,
    setamount,
    Loading
}) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setamount(price)
        setBuy(true);
    };

    return (
        <>
            <Card style={{ maxWidth: 250, border: "1px solid black" }}>
                <CardContent>
                    <img src={image} alt={heading} style={{ width: "100%", marginBottom: "1rem" }} />
                    <Typography variant="h6" style={{ marginBottom: "0.5rem" }}>
                        {heading}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        style={{ marginBottom: "1rem", fontWeight: "bold" }}
                    >
                        {price}&nbsp;tIMX
                    </Typography>
                    {Loading ?
                        <div className="flex flex-col text-center items-center">
                            <p className="text-xl mt-2 text-red-500">Loading! It will take few seconds</p>
                            <svg className="animate-spin w-7 h-7 mt-6 fill-slate-800" viewBox="3 3 18 18">
                                <path className="opacity-20" d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z">
                                </path>
                                <path d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z">
                                </path>
                            </svg>
                        </div> :
                        <ColorButton variant="contained" onClick={handleClickOpen}>
                            Buy
                        </ColorButton>}
                    <DialogBox open={open} handleClose={handleClose} />
                </CardContent>
            </Card>
        </>
    );
};

export default ProductCard;
