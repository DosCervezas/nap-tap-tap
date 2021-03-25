import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { v4 } from 'uuid';

import { Alarm } from '../../models/alarm.model';
import { environment } from 'src/environments/environment';
import { Dto } from '../../models/dto.model';

@Injectable({
  providedIn: 'root',
})
export class AlarmService {
  private _alarms: BehaviorSubject<Array<Alarm>> = new BehaviorSubject([]);
  private _server: string;

  public readonly alarms: Observable<
    Array<Alarm>
  > = this._alarms.asObservable();

  constructor(private _httpClient: HttpClient) {
    this._server = environment.server;
  }

  addAlarm(alarm: Alarm): Observable<Alarm> {
    return this._httpClient.post(this._server + '/alarms', alarm).pipe(
      map((res: Dto<Alarm>) => {
        return res.alarm;
      })
    );
  }

  testAlarm(id: string): Observable<Alarm> {
    return this._httpClient.get(this._server + '/alarms/' + id + '/test').pipe(
      map((res: Dto<Alarm>) => {
        return res.alarm;
      })
    );
  }

  getAlarms(): Observable<Alarm[]> {
    return this._httpClient.get(this._server + '/alarms').pipe(
      map((res: Dto<Alarm[]>) => {
        return res.alarm;
      })
    );
  }

  getRingingAlarm(): Observable<Alarm> {
    return this._httpClient.get(this._server + '/alarms/ringing').pipe(
      map((res: Dto<Alarm>) => {
        return res.alarm;
      })
    );
  }

  deleteAlarm(id: string): Observable<boolean> {
    return this._httpClient.delete(this._server + '/alarms/' + id).pipe(
      map((res: Dto<boolean>) => {
        return res.success;
      })
    );
  }

  activateAlarm(id: string, activate: boolean): Observable<Alarm> {
    return this._httpClient
      .put(
        this._server + '/alarms/' + id + '/activate/' + String(activate),
        null
      )
      .pipe(
        map((res: Dto<Alarm>) => {
          return res.alarm;
        })
      );
  }

  stopAlarm(id: string): Observable<Alarm> {
    return this._httpClient.get(this._server + '/alarms/' + id + '/stop').pipe(
      map((res: Dto<Alarm>) => {
        return res.alarm;
      })
    );
  }
}
