import { Subject, filter, map, tap } from "rxjs";

export class EventBusService {
  subject$: Subject<any>;

  constructor() {
    this.subject$ = new Subject();
  }

  emit(event) {
    this.subject$.next(event);
  }

  on(eventName, action) {
    return this.subject$
      .pipe(
        filter((e) => e.name === eventName),
        map((e) => e["data"]),
        tap(e => console.log(e))
      )
      .subscribe(action);
  }
}
