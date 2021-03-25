import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import days from 'days';

import { SettingsComponent } from '../settings/settings.component';
import { AlarmService } from '../core/services/alarm/alarm.service';

import { Alarm } from '../core/models/alarm.model';
import { RingComponent } from '../ring/ring.component';

@Component({
  selector: 'app-alarms',
  templateUrl: 'alarms.page.html',
  styleUrls: ['alarms.page.scss'],
})
export class AlarmsPage implements OnInit {
  alarms: Alarm[] = [];
  editable = false;

  days = [];

  constructor(
    public modalController: ModalController,
    private alarmService: AlarmService
  ) {}

  ngOnInit() {
    this.getAlarms();

    this.alarmService.getRingingAlarm().subscribe(async (alarm: Alarm) => {
      if (alarm != null) {
        const modal = await this.modalController.create({
          component: RingComponent,
          componentProps: { alarm },
        });

        await modal.present();

        await modal.onDidDismiss();

        this.getAlarms();
      }
    });

    this.initWeek();
  }

  initWeek() {
    if (this.days.length == 0) {
      this.days = days.abbr;
      let sunday = this.days.shift();
      this.days.push(sunday);
    }
  }

  isActiveDay(index: number, alarm: Alarm) {
    let split = alarm.cron.split(' ');
    if (split[4].split(',').find((day: string) => Number(day) == index + 1)) {
      return 'primary';
    }
    return '';
  }

  private getAlarms() {
    this.alarmService.getAlarms().subscribe((alarms: Alarm[]) => {
      this.alarms = alarms;
    });
  }

  async openModal(alarm: Alarm) {
    if (this.editable) {
      setTimeout(() => {
        this.editable = false;
      }, 400);
    }

    const modal = await this.modalController.create({
      component: SettingsComponent,
      componentProps: { alarm },
    });

    await modal.present();

    await modal.onDidDismiss();

    this.getAlarms();
  }

  setEditable() {
    this.editable = !this.editable;
  }

  deleteAlarm(id: string) {
    this.alarmService.deleteAlarm(id).subscribe(() => {
      this.getAlarms();
    });
  }

  test(alarm: Alarm) {
    this.alarmService.testAlarm(alarm.id).subscribe((responseAlarm: Alarm) => {
      this.getAlarms();
    });
  }

  stop(alarm: Alarm) {
    this.alarmService.stopAlarm(alarm.id).subscribe((responseAlarm: Alarm) => {
      this.getAlarms();
    });
  }

  getTime(alarm: Alarm) {
    let split: string[] = alarm.cron.split(' ');
    return split[1] + ':' + split[0];
  }

  activateAlarm(alarm: Alarm, event: any) {
    if (alarm.active != event.detail.checked) {
      this.alarmService
        .activateAlarm(alarm.id, event.detail.checked)
        .subscribe(() => {
          this.getAlarms();
        });
    }
  }
}
