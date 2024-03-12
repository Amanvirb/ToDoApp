import { router } from '../../router/Routes';
import { commonStyles } from '../styles/commonStyles';
import { LoadingButton } from '@mui/lab';

interface RouteProp {
    route: string;
    btnText: string;
    btnLoading?: boolean;
}

const CommonButton = ({ route, btnText, btnLoading }: RouteProp) => {
    return (
         <LoadingButton
            onClick={() => router.navigate(route)}
            sx={commonStyles.btnStyle}
            loading={btnLoading}
            >
            {btnText}</LoadingButton>
    )
}

export default CommonButton;