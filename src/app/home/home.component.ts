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
    public authService: AuthService,
    private downloads: DownloadService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // console.log(window.location.href.split('/')[3]);

    this.route.params
      .pipe(take(1))
      .subscribe((params) => (this.encrypted = `${params.secret}=`));

    console.log(this.encrypted);
    console.log(this.decryptUsingAES256());
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

    return (this.decrypted = CryptoJS.AES.decrypt(this.encrypted, key, {
      keySize: 5,
      iv,
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    }).toString(CryptoJS.enc.Utf8));
  }
}
