import { Card, Skeleton, CardContent, CardActions, Box } from '@mui/material';


interface Props {
    iteration: number;
  }
const ProductCardSkeleton=({ iteration }: Props) =>{
    const elements = [];

  if (iteration > 0) {
    for (let index = 0; index < iteration; index++) {
      elements.push(
         <Card sx={{ width: 350, border: 1, m:2 }} key={index}>
                <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
                <CardContent>
                    <>
                        <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                        <Skeleton animation="wave" height={10} width="80%" />
                    </>
                </CardContent>
                <CardActions>
                    <>
                        <Skeleton animation="wave" height={10} width='40%' />
                        <Skeleton animation="wave" height={10} width="20%" />
                    </>
                </CardActions>
            </Card>
     )
    }
  } else {
    elements.push(
       <Card sx={{ width: 350, border: 1, m:2 }}>
                <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
                <CardContent>
                    <>
                        <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                        <Skeleton animation="wave" height={10} width="80%" />
                    </>
                </CardContent>
                <CardActions>
                    <>
                        <Skeleton animation="wave" height={10} width='40%' />
                        <Skeleton animation="wave" height={10} width="20%" />
                    </>
                </CardActions>
            </Card>
  )
  }

    return (
        <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: 'center', border: '3px solid blue' }}>
           {elements}
        </Box>
    )
}
export default ProductCardSkeleton;