import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';

interface CardProps {
    content: string;
    heading: string;
    points: number;
    UrlLink: string;
}

const Cards: React.FC<CardProps> = ({ content, heading, points, UrlLink }) => {

    return (
        <div className='bg-white rounded p-2'>
            <Typography variant="h4" fontWeight={600} color="black">
                {heading}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {content}
            </Typography>
                <Typography variant="h6" color="text.primary" gutterBottom>
                    Points: {points}
                </Typography>
                <Button variant="contained" href={`${UrlLink}`}>
                    Play
                </Button>
        </div>
    );
}

export default Cards;