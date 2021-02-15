import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  ActionReducer
} from "@ngrx/store";
import { routerReducer, RouterReducerState } from "@ngrx/router-store";
import { counterReducer, CounterState } from "./counter.reducer";
import { environment } from "../../environments/environment";

export interface State {
  router: RouterReducerState;
  counter: CounterState;
}

export const reducers: ActionReducerMap<State> = {
  router: routerReducer,
  counter: counterReducer
};

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function(state: State, action: any): State {
    console.log("state", state);
    console.log("action", action);
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [logger]
  : [];

export const getCounterState = createFeatureSelector<State, CounterState>(
  "counter"
);

export const selectTimer = createSelector(
  getCounterState,
  configurationState => {
    const timer = configurationState.timer;
    if (timer) {
      if (timer > 59) {
        return "(" + Math.round(timer / 60) + " min)";
      } else {
        return "(" + timer + " sec)";
      }
    } else {
      return "no value";
    }
  }
);
