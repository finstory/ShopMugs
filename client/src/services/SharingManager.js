import { Subject } from 'rxjs';

export class SharingManager {
  subject$ = new Subject();

  getSubject() {
    return this.subject$.asObservable();
  }

  setSubject(value) {
    this.subject$.next(value);
  }
}