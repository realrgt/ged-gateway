import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { Music } from '../models/music.model';

@Injectable({ providedIn: 'root' })
export class MusicService {
  constructor(private http: HttpClient) {}

  getMusics(playlistId: number): Observable<Music[]> {
    return this.http
      .get<Music[]>(
        `https://ged.handza.co.mz/?audioigniter_playlist_id=${playlistId}`
      )
      .pipe(take(1));
  }
}
