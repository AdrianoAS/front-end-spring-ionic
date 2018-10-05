import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.enderecos = [
       {
      id: "1",
      logradouro: "Rua 15 de novembro",
      numero: "300",
      complemento: "Apto 30",
      bairro: "Santo Antonio",
      cep: "08226015",
       cidade: {
         id: "1",
         nome: "Uberlandia",
          estado: {
            id: "1",
            nome: "Minas Gerais"
          }
        }
       },
       {
        id: "2",
        logradouro: "Rua Aleia",
        numero: "341",
        complemento: "",
        bairro: "Vila Nova",
        cep: "08226000",
         cidade: {
           id: "1",
           nome: "Campinas",
            estado: {
              id: "2",
              nome: "São Paulo"
           }
        }
      }
   ];
  }
}
