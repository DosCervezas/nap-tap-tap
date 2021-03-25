export interface Alarm {
  name: string;
  //message: string;
  volume: number;
  device: string;
  //repeat: number[];
  lights: boolean;
  context: string;
  contextImage?: string;
  cron: string;
  //time: string;
  //sound: string;
  //snooze: boolean;
  active: boolean;
  id?: string;
}
