import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';
import { StoregeService } from '../../services/estorege.service';
import { ClienteService } from '../../services/domain/cliente.service';

/**
 * Generated class for the PickAddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  enderecos : EnderecoDTO[];

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public storage: StoregeService,
     public clienteService: ClienteService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.email){
      this.clienteService.findByEmail(localUser.email)
      .subscribe(response => {
        this.enderecos = response['enderecos'];
      },
      error => {
        if(error.status == 403 ){
          this.navCtrl.setRoot('HomePage');
        }
      });
    }else{
      this.navCtrl.setRoot('HomePage');
    }
  }
}
