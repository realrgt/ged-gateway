import {
  AfterViewInit,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

import { Song } from '../core/models/song.model';
import { FileService } from '../core/services/file.service';
import * as fileSaver from 'file-saver';
import { ModalService } from '../core/modal';
import { ModalComponent } from '../core/modal/modal.component';
import { AuthService } from '../core/services/auth.service';

import { take } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  displayPurchase: boolean = false;
  displayDownloadButton: boolean = false;

  @ViewChild(ModalComponent)
  public modal: ModalComponent | undefined;

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

  constructor(
    private fileService: FileService,
    private modalService: ModalService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.authService.user$.pipe(take(1)).subscribe((user) => {
      console.log(user);

      if (!user) {
        this.modal?.open();
      } else {
        this.modal?.close();
      }
    });
  }

  public onSingleDownload(fileURL: string, fileName: string): void {
    this.fileService.downloadFile(fileURL).subscribe(
      (res) => {
        console.log(res);

        const blob: any = new Blob([res], {
          type: 'text/json; charset=utf-8',
        });
        const url = window.URL.createObjectURL(blob);

        fileSaver.saveAs(blob, fileName);
      },
      (error) => console.log(error)
    );
  }

  openModal(id: string): void {
    this.modalService.open(id);
  }

  closeModal(id: string): void {
    this.modalService.close(id);
  }

  googleSignIn(): any {
    this.authService.googleSignIn().then((res) => this.modal?.close());
  }

  facebookSignIn(): any {
    this.authService.facebookSignIn().then((res) => this.modal?.close());
  }
}
