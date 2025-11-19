import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {App} from "./components/app/app.tsx";
import {Setting} from "./conts.ts";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <App
      rentalOffersCount={Setting.rentalOffersCount}/>
  </StrictMode>,
)
