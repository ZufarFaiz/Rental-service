import {configureStore} from "@reduxjs/toolkit";
import {reducer} from "./reducet.ts";

export const store=configureStore({reducer});