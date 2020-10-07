import React, { useState } from "react";
import styled from "styled-components";
import "./styles.css";
import Header from "./components/Header";
import PickerContainer from "./components/Picker";
import Footer from "./components/Footer";
import { CompleteContext } from "./components/CompleteContext";

const Container = styled.div`
  padding-top: 3rem;
  height: calc(100% - 6rem);
  width: 100%;
`;

export default function App() {
  const [completed, setCompleted] = useState(0);

  return (
    <div className="App">
      <link
        href="https://fonts.googleapis.com/css2?family=PT+Sans&display=swap"
        rel="stylesheet"
      />
      <CompleteContext.Provider value={{ ...{ completed, setCompleted } }}>
        <Header />
        <Container>
          <PickerContainer />
        </Container>
        <Footer />
      </CompleteContext.Provider>
    </div>
  );
}
