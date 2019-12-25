import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class EmailServiceService {

  constructor(private http: HttpService) { }

  enviaremail(data){
    const url = "http://memodotme.herokuapp.com/";
    //http://localhost:3000/sendmail
    this.http.sendEmail(url, data).subscribe(
      data => {
        let res:any = data; 
        console.log(
          `mail has been sent and the message id is ${res.messageId}`
        );
      },
      err => {
        console.log(err);
      }
    );

  }

}
