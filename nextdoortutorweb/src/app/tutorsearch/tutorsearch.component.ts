import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import GoogleAuth = gapi.auth2.GoogleAuth;

@Component({
  selector: 'app-tutorsearch',
  templateUrl: './tutorsearch.component.html',
  styleUrls: ['./tutorsearch.component.css']
})
export class TutorsearchComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService, private zone: NgZone) { }

  ngOnInit() {
  }

  onSignout() {
    const auth2: GoogleAuth = this.authService.getAuth();
    const router = this.router;
    auth2.signOut().then(() => {
      this.zone.run(() => {
        router.navigate(['/']);
        console.log('signed out');
      });
    });
  }


}
