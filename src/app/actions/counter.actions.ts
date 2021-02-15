import { createAction, props } from "@ngrx/store";
export const DoSetTimerValue = createAction(
  "[App] Do Set Time Value",
  props<{ value: number }>()
);
