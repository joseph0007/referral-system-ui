// import "./customButton.styles.scss";
import { CustomButtonContainer } from "./customButton.styles";

const CustomButton = ({ children, ...otherProps }) => {
  return (
    <CustomButtonContainer {...otherProps}>{children}</CustomButtonContainer>
  );
};

export default CustomButton;