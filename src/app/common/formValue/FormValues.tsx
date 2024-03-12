import { Box, Typography } from "@mui/material";

function replacer(_: string, value: unknown) {
  // Filtering out properties
  if (value instanceof File) {
    return {
      size: value.size,
      name: value.name,
      type: value.type,
    };
  }
  return value;
}

interface Props {
  values: unknown;
}

const FormValues = ({ values }: Props) => (
  <Box sx={{ p: '5px', mt: 2.5 }}>
    <Typography variant="body1" component="h6">
      Errors:
    </Typography>
    <Typography component="pre">
      {JSON.stringify(values, replacer, 2)}
    </Typography>
  </Box>
);

export default FormValues;