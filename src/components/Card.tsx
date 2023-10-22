import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';

interface CardProps {
    content: string;
    heading: string;
    points: number;
    UrlLink: string;
    ImgUrl: string;
}

const Cards: React.FC<CardProps> = ({ content, heading, points, UrlLink, ImgUrl }) => {

    return (
        <Card sx={{ maxWidth: 300 }}>
            <Typography variant="h4" fontWeight={600} color="teal">
                {heading}
            </Typography>
            <CardMedia
                component="img"
                sx={{
                    width: '300px',
                    height: '300px',
                    '@media (max-width:350px)': {
                        width: '270px',
                        height: '270px',
                    }
                }}
                image={`/${ImgUrl}`}
                alt="Game"
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {content}
                </Typography>
                <div className='pt-2 flex flex-row justify-between'>
                    <Typography variant="h6" color="text.primary" gutterBottom>
                        Points: {points}
                    </Typography>
                    <Button variant="contained" href={`${UrlLink}`}>
                        Play
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

export default Cards;