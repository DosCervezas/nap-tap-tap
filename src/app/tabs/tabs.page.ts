import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { NapService } from '../core/services/nap/nap.service';
import { AlarmService } from '../core/services/alarm/alarm.service';

import { Alarm } from '../core/models/alarm.model';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage implements OnInit {
  visible = false;

  constructor(
    public alertController: AlertController,
    private alarmService: AlarmService
  ) {}

  ngOnInit() {}
}
