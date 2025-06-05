import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.tsx";
import Favorites from "./pages/favorites/components/Favorites.tsx";
import Home from "./pages/home/Home.tsx";
import CharacterDetails from "./pages/characters/CharacterDetails.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/character/:id" element={<CharacterDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
