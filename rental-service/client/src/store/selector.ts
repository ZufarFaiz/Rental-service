import type {State} from "../types/state.ts";
import type {AuthorizationStatusType} from "../types/authorization-status.ts";


export const getAuthorizationStatus = (state: State): AuthorizationStatusType =>
    state.authorizationStatus;
