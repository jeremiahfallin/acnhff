import React, { useState } from "react";
import styled from "styled-components";
import "./styles.css";
import Header from "../components/Header";
import Picker from "../components/Picker";
import Footer from "../components/Footer";
import { CompleteContext } from "../components/CompleteContext";
import { graphql } from "gatsby";
import Layout from "../components/Layout";

const Container = styled.div`
  padding-top: 3rem;
  height: calc(100% - 6rem);
  width: 100%;
`;

const IndexPage = ({ data }) => {
  const [completed, setCompleted] = useState(0);
  const villagers = data.allVillager.nodes;
  return (
    <main className="App">
      <link
        href="https://fonts.googleapis.com/css2?family=PT+Sans&display=swap"
        rel="stylesheet"
      />
      <CompleteContext.Provider value={{ ...{ completed, setCompleted } }}>
        <Layout>
          <Header />
          <Container>
            <Picker villagers={villagers} />
          </Container>
          <Footer />
        </Layout>
      </CompleteContext.Provider>
    </main>
  );
};

export const query = graphql`
  query VillagerQuery {
    allVillager {
      nodes {
        alt_name
        appearances
        birthday_month
        birthday_day
        debut
        clothing
        image_url
        id
        url
        title_color
        text_color
        species
        sign
        quote
        prev_phrases
        phrase
        personality
        name
        islander
        gender
        nh_details {
          sub_personality
          quote
          photo_url
          image_url
          icon_url
          house_wallpaper
          house_music_note
          house_music
          house_interior_url
          house_flooring
          house_exterior_url
          hobby
          fav_styles
          fav_colors
          clothing_variation
          clothing
          catchphrase
        }
      }
    }
  }
`;

export default IndexPage;
