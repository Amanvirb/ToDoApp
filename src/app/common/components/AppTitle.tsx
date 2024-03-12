import { Box, Typography } from '@mui/material';
import useUtilities from '../../hooks/useUtilities';

interface TitleProp {
    title: string;
}

const AppTitle = ({ title }: TitleProp) => {
    const { isMobile } = useUtilities();
    return (
        <Box component="div">
            <Typography
                variant={isMobile ? 'h6' : 'h5'}
                textAlign="center"
                sx={{
                    mt: 2,
                    mb: 2,
                    // height: 25,
                }}
            >{title}</Typography>
        </Box>
    )
}

export default AppTitle;