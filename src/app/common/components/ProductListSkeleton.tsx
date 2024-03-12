import { Skeleton, Box } from '@mui/material';

interface Props {
    iteration: number;
}
const ProductListSkeleton = ({ iteration }: Props) => {
    const elements = [];

    if (iteration > 0) {
        for (let index = 0; index < iteration; index++) {
            elements.push(<Box sx={{ width: '100%', height: '100%' }} key={index}>
                <Skeleton />
                <Skeleton animation="wave" />
                <Skeleton />
                <Skeleton animation="wave" />
            </Box>)
        }
    } else {
        elements.push(<Box sx={{ width: '100%' }}>
            <Skeleton />
            <Skeleton animation="wave" />
            <Skeleton />
            <Skeleton animation="wave" />
        </Box>)
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: 'center', border: '3px solid blue' }}>
            {elements}
        </Box>
    )
}
export default ProductListSkeleton;