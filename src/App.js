import React from "react";
import "./styles.css";
import Header from "./components/Header";
import PickerContainer from "./components/Picker";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="App">
      <div className="container">
        {/* <link
        href="https://fonts.googleapis.com/css2?family=Spectral:wght@300&display=swap"
        rel="stylesheet"
      /> */}
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans&display=swap"
          rel="stylesheet"
        />

        <Header />
        <PickerContainer />
      </div>
      <Footer />
    </div>
  );
}
