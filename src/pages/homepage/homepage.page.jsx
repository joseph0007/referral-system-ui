// import "./homepage.styles.scss";
import { HomePageContainer } from "./homapge.styles";
import { Profiler } from "react";

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
  </HomePageContainer>
);

export default HomePage;
