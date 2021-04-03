import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Song } from '../core/models/song.model';
import { AuthService } from '../core/services/auth.service';
import { ModalComponent } from '../core/modal/modal.component';
import { DownloadService } from '../core/services/download.service';
import { Download } from '../core/models/download.model';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';
import { MusicService } from '../core/services/music.service';
import { Music } from '../core/models/music.model';

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

  encrypted: string = '';
  decrypted: any = '';

  defaultCover =
    'https://ladydanville.files.wordpress.com/2012/03/blankart.png';

  music: Music = {
    title: 'Nome da música',
    subtitle: 'Nome do cantor',
    audio: '',
    buyUrl: '',
    downloadUrl: '',
    downloadFilename: '',
    cover: this.defaultCover,
  };

  constructor(
    public authService: AuthService,
    private downloads: DownloadService,
    private route: ActivatedRoute,
    private musicService: MusicService
  ) {}

  ngOnInit(): void {
    // console.log(window.location.href.split('/')[3]);

    this.route.params
      .pipe(take(1))
      .subscribe((params) => (this.encrypted = params.secret));

    this.decryptUsingAES256();

    const playlistId = this.decrypted.split(' ')[0];
    const position = this.decrypted.split(' ')[1];

    this.musicService
      .getMusics(playlistId)
      .subscribe((musics) => (this.music = musics[position]));
  }

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

  googleSignIn(): any {
    this.authService.googleSignIn().then((res) => this.modal?.close());
  }

  facebookSignIn(): any {
    this.authService.facebookSignIn().then((res) => this.modal?.close());
  }

  decryptUsingAES256(): string {
    const key = CryptoJS.enc.Utf8.parse(environment.secret);
    const iv = CryptoJS.enc.Utf8.parse(environment.secret);

    const regularEncrypted = this.encrypted
      .replace(/p1L2u3S/g, '+')
      .replace(/s1L2a3S4h/g, '/')
      .replace(/e1Q2u3A4l/g, '=');

    return (this.decrypted = CryptoJS.AES.decrypt(regularEncrypted, key, {
      keySize: 5,
      iv,
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    }).toString(CryptoJS.enc.Utf8));
  }
}
