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
  padding-bottom: 3rem;
`;

export default function App() {
  return (
    <div className="App">
      <PageLayout>
        <Header />
        <Container>
          <link
            href="https://fonts.googleapis.com/css2?family=PT+Sans&display=swap"
            rel="stylesheet"
          />
          <PickerContainer />
        </Container>
        <Footer />
      </PageLayout>
    </div>
  );
}
