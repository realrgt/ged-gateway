import { Component, OnInit } from '@angular/core';
import { Song } from '../core/models/song.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  displayPurchase: boolean = false;

  songs: Song[] = [
    {
      artist: 'Hillsong United',
      album: 'People',
      year: 2016,
      albumArt:
        'https://i1.wp.com/trevordecker.com/wp-content/uploads/2019/04/Hillsong-United-People-2019-English-Christian-Live-Album.jpg?w=1200&ssl=1',
      archives: [
        'http://gedlab.handza.co.mz/wp-content/uploads/2021/03/Raimundo-Sive-Yehova-Una-Hina2.mp3',
        'http://gedlab.handza.co.mz/wp-content/uploads/2021/03/Raimundo-Sive-Yehova-Una-Hina2.mp3',
      ],
    },
    {
      artist: 'Justin Bieber',
      album: 'Justice',
      year: 2021,
      albumArt:
        'https://twitter.com/justinbieber/status/1372760718500458496/photo/1',
      archives: [
        'http://gedlab.handza.co.mz/wp-content/uploads/2021/03/Raimundo-Sive-Yehova-Una-Hina2.mp3',
        'http://gedlab.handza.co.mz/wp-content/uploads/2021/03/Raimundo-Sive-Yehova-Una-Hina2.mp3',
      ],
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  public onPurchase(): void {
    this.displayPurchase = !this.displayPurchase;
  }
}
