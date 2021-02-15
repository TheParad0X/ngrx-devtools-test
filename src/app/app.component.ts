import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Observable } from "rxjs";
import { Store, select } from "@ngrx/store";
import * as fromRoot from "./reducers/";
import * as counterActions from "./actions/counter.actions";
import { Subject, timer } from "rxjs";
import { map, takeUntil, takeWhile } from "rxjs/operators";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  stopTimer$: Subject<any> = new Subject();

  constructor(public store: Store) {}

  ngOnInit() {}

  start() {
    console.log("start");

    const start = 60;
    const countDown$ = timer(0, 1000).pipe(
      map(i => start - i),
      takeWhile(i => i >= 0),
      takeUntil(this.stopTimer$)
    );

    countDown$.subscribe(timerValue => {
      this.store.dispatch(
        counterActions.DoSetTimerValue({ value: timerValue })
      );
    });
  }

  stop() {
    console.log("stop");
    this.stopTimer$.next();
  }
}
