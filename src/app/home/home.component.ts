import { Component, OnInit } from '@angular/core';

import { Song } from '../core/models/song.model';
import { FileService } from '../core/services/file.service';
import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  displayPurchase: boolean = false;
  displayDownloadButton: boolean = false;

  song: Song | undefined = {
    artist: 'Hillsong United',
    album: 'People',
    year: 2016,
    albumArt:
      'https://i1.wp.com/trevordecker.com/wp-content/uploads/2019/04/Hillsong-United-People-2019-English-Christian-Live-Album.jpg?w=1200&ssl=1',
    archives: [
      'http://gedlab.handza.co.mz/wp-content/uploads/2021/03/Raimundo-Sive-Yehova-Una-Hina2.mp3',
      'http://gedlab.handza.co.mz/wp-content/uploads/2021/03/Raimundo-Sive-Yehova-Una-Hina2.mp3',
      'http://gedlab.handza.co.mz/wp-content/uploads/2021/03/Raimundo-Sive-Yehova-Una-Hina2.mp3',
    ],
  };

  constructor(private fileService: FileService) {}

  ngOnInit(): void {}

  public onSingleDownload(fileURL: string, fileName: string): void {
    this.fileService.downloadFile(fileURL).subscribe(
      (res) => {
        console.log(res);

        const blob: any = new Blob([res], {
          type: 'text/json; charset=utf-8',
        });
        const url = window.URL.createObjectURL(blob);
        //window.open(url);
        //window.location.href = res.url;
        fileSaver.saveAs(blob, fileName);
      },
      (error) => console.log(error)
    );
  }
}
