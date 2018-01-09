import { Http, Response } from '@angular/http';
import { Component } from '@angular/core';
import 'rxjs/add/operator/map';
import { Authent } from './authent';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  CONNECTION_STATE: boolean;
  AUTO_LOGIN: boolean;
  authtoken: string;
  username: string;
  password: string;

  credentials = (
    {
      appname: 'MICap',
      device: 'debug',
      secret: 'livingcase2',
      username: this.username,
      password: this.password,
      role: 'RESEARCH'
    }
  );


constructor(private http: Http, /*private _router: Router*/) { }

setUsername (uname: string) {
  this.username = uname;
}

setPassword ( passw: string) {
  this.password = passw;
}

  login(uname: string, passw: string) {

    this.username = uname;
    this.password = passw;
    console.log(this.credentials);

    return this.http.post('https://test.midata.coop/v1/auth', this.credentials).map(
      (response) => response.json()).subscribe(
      (data) => console.log(data),
      );

  }






}
