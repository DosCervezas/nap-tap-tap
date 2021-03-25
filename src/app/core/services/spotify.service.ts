import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Dto } from '../models/dto.model';
import { Playlist } from '../models/playlist.model';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  private _server: string;

  constructor(private _httpClient: HttpClient) {
    this._server = environment.server;
  }

  getPlaylists(): Observable<Playlist[]> {
    return this._httpClient.get(this._server + '/spotify/playlists').pipe(
      map((res: Dto<Playlist[]>) => {
        return res.items;
      })
    );
  }
}
