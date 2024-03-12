import { useMediaQuery } from "@mui/material";
import { selectOptions } from "../common/options/commonOptions";

const useUtilities = () => {
  const isMobile = !useMediaQuery("(min-width:768px)");
  const isTablet = !useMediaQuery("(min-width:900px)");
  const isMediumScreen = !useMediaQuery("(min-width:1439px)");

  // const isMediumScreen = !useMediaQuery("(min-width:1023px)");

  const avatarStyle = {
    width: isMobile ? 50 : 100,
    height: isMobile ? 50 : 100,
  };
  const avatarStyle1 = {
    width: isMobile ? 20 : 40,
    height: isMobile ? 20 : 40,
  };
  const appFontSize = {
    fontSize: isMobile ? 10 : 16,
  };
  

  const modalStyle = () => {
    return ({
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: isMobile ? 400 : 360,
      // bgcolor: 'background.paper',
      bgcolor: '#bce2ca',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
      // height: isMobile ? 650 : 800,
    })
  };


  const getPriority = (v: number) => {
    const opt = selectOptions.find((x) => x.value === v);
    if (opt !== undefined)
      return opt.text;

    return 'High';
  };

  return {
    isMobile,
    isTablet,
    isMediumScreen,
    avatarStyle,
    avatarStyle1,
    appFontSize,
    modalStyle,
    getPriority
  };
};

export default useUtilities;
