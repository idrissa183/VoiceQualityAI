import { StrictMode } from "react";
import { createRoot } from "react-dom/client";


import './index.css'
// import App from './App.tsx'
import Urls from "./routers/Urls.tsx";
createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Urls />
  </StrictMode>
)
