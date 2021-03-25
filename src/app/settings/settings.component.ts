import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, NavParams } from '@ionic/angular';
import { NativeRingtones } from '@ionic-native/native-ringtones/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import days from 'days';

import { Alarm } from '../core/models/alarm.model';

import { AlarmService } from '../core/services/alarm/alarm.service';
import { SpotifyService } from '../core/services/spotify.service';
import { Playlist } from '../core/models/playlist.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  label = 'Alarm';
  repeat: number[] = [];
  time: string;
  selectedPlaylist: string;
  active = true;
  id: string;
  context: string = 'spotify:playlist:4uXGXEeeiL6IBkm8UDiSjm';
  device: string = 'f5401e40a747827fefddf5e1566881420e6495ff';
  lights: boolean = true;
  volume: number = 15;

  days = days;
  playlists: Playlist[] = [];

  constructor(
    private params: NavParams,
    private modalController: ModalController,
    public alertController: AlertController,
    private alarmService: AlarmService,
    private spotifyService: SpotifyService,
    public nativeRingtones: NativeRingtones,
    public filePath: FilePath
  ) {
    if (params.data.alarm) {
      let alarm: Alarm = params.data.alarm;
      this.label = alarm.name;
      this.active = alarm.active;
      this.id = alarm.id;
      this.lights = alarm.lights;
      this.volume = alarm.volume;
      this.context = alarm.context;
      this.lights = alarm.lights;

      let split: string[] = alarm.cron.split(' ');
      this.time = split[1] + ':' + split[0];

      split[4].split(',').forEach((day: string) => {
        this.repeat.push(Number(day));
      });
    }
  }

  ngOnInit() {
    let sunday = this.days.shift();
    this.days.push(sunday);

    this.spotifyService.getPlaylists().subscribe(
      (playlists: Playlist[]) => {
        this.playlists = playlists;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  async closeModal() {
    await this.modalController.dismiss();
  }

  deleteAlarm() {
    this.alarmService.deleteAlarm(this.id).subscribe(() => {
      this.closeModal();
    });
  }

  setAlarm() {
    if (this.label && this.time) {
      if (this.id) {
        //convert repeat and time into cron
        //this.repeat
        //this.time

        //set context as spotify
        const alarm: Omit<Alarm, 'id'> = {
          name: this.label,
          cron: '',
          context: this.context,
          active: this.active,
          device: this.device,
          lights: this.lights,
          volume: this.volume,
        };

        console.log('update alarm...');
      } else {
        const time: Date = new Date(this.time);

        let cron: string = time.getMinutes() + ' ' + time.getHours() + ' * * ';

        this.repeat.forEach((day: number, index: number) => {
          if (index != 0) {
            cron += ',';
          }
          cron += day;
        });

        console.info('cron ' + cron);

        const alarm: Alarm = {
          name: this.label,
          cron: cron,
          context: this.context,
          active: this.active,
          device: this.device,
          lights: this.lights,
          volume: this.volume,
          contextImage: null,
        };
        this.alarmService.addAlarm(alarm).subscribe(() => {
          this.closeModal();
        });
      }
    }
  }
}
