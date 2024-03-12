import { Box, Paper } from '@mui/material'

interface Props {
    title: string
}

export const AppItem = ({title}:Props) => {
    return (
        <Box component="div">
            <Paper sx={{ p: 1, textAlign: "center", color: "#000" }}>
            {title}
            </Paper>
        </Box>
    )
}
