/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as biometrics from "../biometrics.js";
import type * as biometricThresholds from "../biometricThresholds.js";
import type * as functions_states_updateState from "../functions/states/updateState.js";
import type * as initializeStates from "../initializeStates.js";
import type * as stateManager from "../stateManager.js";
import type * as states from "../states.js";
import type * as stateTransitions from "../stateTransitions.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  biometrics: typeof biometrics;
  biometricThresholds: typeof biometricThresholds;
  "functions/states/updateState": typeof functions_states_updateState;
  initializeStates: typeof initializeStates;
  stateManager: typeof stateManager;
  states: typeof states;
  stateTransitions: typeof stateTransitions;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
