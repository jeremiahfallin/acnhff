import React from "react";
import styled from "styled-components";
import "./styles.css";
import Header from "./components/Header";
import PickerContainer from "./components/Picker";
import Footer from "./components/Footer";
import useWindowDimensions from "./hooks/useWindowDimensions";

const PageLayout = styled.div`
  position: relative;
  min-height: 100vh;
`;

const Container = styled.div`
  padding-top: 3rem;
  height: calc(100vh - 6rem);
  width: 100%;
`;

export default function App() {
  let { height: vh } = useWindowDimensions();
  vh *= 0.01;

  return (
    <div className="App">
      <link
        href="https://fonts.googleapis.com/css2?family=PT+Sans&display=swap"
        rel="stylesheet"
      />
      <PageLayout>
        <Header />
        <Container vh={vh}>
          <PickerContainer />
        </Container>
        <Footer />
      </PageLayout>
    </div>
  );
}
