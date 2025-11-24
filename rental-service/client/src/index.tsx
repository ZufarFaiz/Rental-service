import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {App} from "./components/app/app.tsx";
import {Setting} from "./conts.ts";
import {offers} from "./mocks/offers.ts";
import {offersList} from "./mocks/offers-list.ts";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <App
      rentalOffersCount={Setting.rentalOffersCount}
      offersList={offersList}
      offers={offers}/>
  </StrictMode>,
)
