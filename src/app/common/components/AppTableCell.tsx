import { TableCell, styled, tableCellClasses } from '@mui/material';
import useUtilities from '../../hooks/useUtilities';

interface Props {
  text: string;
}

const AppTableCell = ({ text }: Props) => {

  const { appFontSize } = useUtilities();

  const StyledTableCell = styled(TableCell)(({ theme }) => (

    {
      [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
      },
      [`&.${tableCellClasses.body}`]: {
        fontSize: appFontSize,
      },
    }));

  return (
    <StyledTableCell>{text}{appFontSize.fontSize}</StyledTableCell>
  )
}

export default AppTableCell;