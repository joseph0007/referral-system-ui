// import "./homepage.styles.scss";
import { HomePageContainer } from "./homapge.styles";
import { Profiler } from "react";
import { ToastContainer, toast } from 'react-toastify';

const HomePage = () => (
  <HomePageContainer>
    <Profiler
      id="Menu"
      onRender={(id, phase, actualDuration) => {
        console.log({
          id,
          phase,
          actualDuration,
        });
      }}
    >
      <div>
        Hello world
      </div>
    </Profiler>
    <ToastContainer />
  </HomePageContainer>
);

export default HomePage;
