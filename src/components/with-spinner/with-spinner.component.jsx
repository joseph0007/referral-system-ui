import Spinner from "../spinner/spinner.component";

export const withSpinner =
  (InputComponent) =>
  ({ isLoading, ...otherProps }) => {
    return isLoading ? <Spinner /> : <InputComponent {...otherProps} />;
  };
