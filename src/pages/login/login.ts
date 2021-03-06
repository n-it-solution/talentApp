import { Component } from '@angular/core';
import {Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import {Storage} from '@ionic/storage';
import {GlobalVariableProvider} from "../../providers/global-variable/global-variable";
import {WelcomePage} from "../welcome/welcome";
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginData  = {id: "", pass: ""};
  data:any;
  data2:any;
  login(){
    this.data = this.httpClient.post(this.globalVar.apiUrl + '/user/login',this.loginData);
    this.data
      .subscribe(data => {
        console.log(data);
        if (data.status == 'success'){
          this.storage.set('loginData', data);
          this.events.publish('login:success',data);
          // alert('Welcome MR/MISS '+data.data.name);
          this.navCtrl.setRoot(WelcomePage);
        }else {
          alert('User ID or Password Is Incorrect')
        }
      },error=> {
        alert('something wrong please contact to site developer');
        console.log(error);
      });
  }
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public httpClient: HttpClient,private storage: Storage,public events: Events,public globalVar: GlobalVariableProvider
  ) {
    // storage.set('test','aa');
    // storage.get('test1').then((data) => {console.log(data)}).catch((error) => {console.log(error)})
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
