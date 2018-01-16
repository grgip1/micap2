import { MidataConnection } from './../../services/MidataConnection';
import { Bundle, fromFhir, Resource } from 'Midata';
import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Authent2} from './authent2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})



export class HomeComponent implements OnInit {

  bundle: JSON;

  constructor(private midata: MidataConnection, private http: Http) {
  }

  login(uname, pword) {
    this.midata.login(uname, pword);
  }

  data = (
    {
      midatastudy_id: 'livedemo',
      id1: '1',
      effectivedatetime1: '16.01.2018',
      trynb: '1',
      nbinvertedconnections: '1',
      nberrors: '0',
      nbcorrections: '0',
      score: '100',
      nbcorrecttries: '1',
      duration1: '30'
    }
  );

  pushRedcap() {
    this.http.post('http://localhost/dashboard/micap/REDCap_Test2.php', this.data).subscribe((data) => console.log(data));
  }


  ngOnInit() {

    var myResources: Resource[] = [];
    var size = 0;
    var json;

    document.getElementById('files').addEventListener('change', handleFileSelect, false);

    function handleFileSelect(evt) {
      var files = evt.target.files; // FileList object

      // files is a FileList of File objects. List some properties.
      var output = [];
      for (var i = 0, f; f = files[i]; i++) {
        var reader = new FileReader();

        // Closure to capture the file information.
        reader.onload = (function (theFile) {
          return function (e) {
            try {
              json = JSON.parse(e.target.result);
              console.log(json);

              for (const entry of json.entry){
                console.log(myResources);
                console.log(size);
                myResources[size] = fromFhir(entry.resource);
                console.log(myResources[size]);
                size++;
              }
            } catch (ex) {
              alert('ex when trying to parse json = ' + ex);
            }
          }
        })(f);
        reader.readAsText(f);
      }
    }
  }
}
