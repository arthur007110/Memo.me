import { Injectable } from '@angular/core';
import * as nodemailer from 'nodemailer'; 

@Injectable({
  providedIn: 'root'
})
export class EmailServiceService {

  

  //transporter.sendMail( mailOptions, (error, info) => { 
  //  if (error) { 
  //    return console.log(`error: ${error}`); 
  //  } 
  //  console.log(`Message Sent ${info.response}`); 
  //}); 
  
  sendEmail( to:string[], subject:string, text:string){
    let transporter = nodemailer.createTransport( 
      `smtps://<username>%40gmail.com:<password>@smtp.gmail.com` 
    ); 
  
    let mailOptions = { 
      from : 'from_test@gmail.com', 
      to : to, 
      subject : subject, 
      text: text 
    }; 

  transporter.sendMail(mailOptions, (error, info) => { 
    if (error) { 
      return console.log(`error: ${error}`); 
    } 
    console.log(`Message Sent ${info.response}`); 
  }); 

  }

  constructor() { }

  
}
