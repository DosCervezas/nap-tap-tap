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
    return split[1] + ':' + split[0];
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
