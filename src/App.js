import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ArtistList from "./components/ArtistList";
import ArtistAlbums from "./components/ArtistAlbums";
import ArtistTweets from "./components/ArtistTweets";
import HomePage from "./components/HomePage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/artists" element={<ArtistList />} />
        <Route path="/artists/:artistId" element={<ArtistAlbums />} />
        <Route path="/artists/:artistId/tweets" element={<ArtistTweets />} />
      </Routes>
    </Router>
  );
};

export default App;
