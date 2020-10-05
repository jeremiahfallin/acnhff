import React from "react";
import styled from "styled-components";
import "./styles.css";
import Header from "./components/Header";
import PickerContainer from "./components/Picker";
import Footer from "./components/Footer";

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
  return (
    <div className="App">
      <link
        href="https://fonts.googleapis.com/css2?family=PT+Sans&display=swap"
        rel="stylesheet"
      />
      <Header />
      <Container>
        <PickerContainer />
      </Container>
      <Footer />
    </div>
  );
}
