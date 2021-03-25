import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Alarm } from '../core/models/alarm.model';
import { AlarmService } from '../core/services/alarm/alarm.service';

@Component({
  selector: 'app-ring',
  templateUrl: './ring.component.html',
  styleUrls: ['./ring.component.scss'],
})
export class RingComponent implements OnInit {
  alarm: Alarm;

  constructor(
    private params: NavParams,
    private alarmService: AlarmService,
    private modalController: ModalController
  ) {
    this.alarm = params.data.alarm;
  }

  ngOnInit() {}

  getTime(alarm: Alarm) {
    let split: string[] = alarm.cron.split(' ');
    let hours = split[1];
    let minutes = split[0];
    if (hours.length == 1) {
      hours = '0' + split[1];
    }
    if (minutes.length == 1) {
      minutes = '0' + split[0];
    }
    return hours + ':' + minutes;
  }

  stop() {
    this.alarmService.stopAlarm(this.alarm.id).subscribe(() => {
      this.closeModal();
    });
  }

  async closeModal() {
    await this.modalController.dismiss();
  }
}
