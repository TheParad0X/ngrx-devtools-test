import { Action, createReducer, on } from "@ngrx/store";
import * as counterActions from "../actions/counter.actions";

export interface CounterState {
  timer: number;
}

const initialState: CounterState = {
  timer: undefined
};

export function counterReducer(
  state: CounterState | undefined,
  action: Action
) {
  return reducer(state, action);
}

const reducer = createReducer(
  initialState,

  on(counterActions.DoSetTimerValue, (state, { value }) => {
    return {
      ...state,
      timer: value
    };
  })
);
