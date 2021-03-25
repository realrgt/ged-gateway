import {
  AfterViewInit,
  Component,
  Inject,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

import { Song } from '../core/models/song.model';
import { ModalService } from '../core/modal';
import { ModalComponent } from '../core/modal/modal.component';
import { AuthService } from '../core/services/auth.service';

import { take } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { DownloadService } from '../core/services/download.service';
import { Download } from '../core/models/download.model';

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

  download$: Observable<Download> | undefined;

  song: Song | undefined = {
    artist: 'Hillsong United',
    album: 'People',
    year: 2016,
    albumArt:
      'https://i1.wp.com/trevordecker.com/wp-content/uploads/2019/04/Hillsong-United-People-2019-English-Christian-Live-Album.jpg?w=1200&ssl=1',
    archives: [
      'http://gedlab.handza.co.mz/wp-content/uploads/2021/03/Raimundo-Sive-Yehova-Una-Hina2.mp3',
    ],
  };

  constructor(
    private modalService: ModalService,
    public authService: AuthService,
    private downloads: DownloadService,
    @Inject(DOCUMENT) private document: Document
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

  download(fileURL: string, fileName: string): any {
    this.displayDownloadButton = false;
    this.download$ = this.downloads.download(fileURL, fileName);
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
