import type {AuthorizationStatus} from "../conts.ts";

export type AuthorizationStatusType = typeof AuthorizationStatus[keyof typeof AuthorizationStatus];