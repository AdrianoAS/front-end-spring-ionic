import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';
import { StoregeService } from '../../services/estorege.service';
import { ClienteService } from '../../services/domain/cliente.service';
import { CartService } from '../../services/cart.service';
import { PedidoDTO } from '../../models/pedido.dto';

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
  pedido : PedidoDTO;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public storage: StoregeService,
     public clienteService: ClienteService,
     public cartService: CartService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.email){
      this.clienteService.findByEmail(localUser.email)
      .subscribe(response => {
        this.enderecos = response['enderecos'];

        let cart  = this.cartService.getCart();
        this.pedido = {
          cliente: {id: response['id']},
          enderecoDeEntrega: null,
          pagamento: null,
          itens: cart.items.map(x => {return {quantidade: x.quantidade, produto:{id: x.produto.id}}})
        }
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
  nextPage(endereco: EnderecoDTO){
    this.pedido.enderecoDeEntrega = {id: endereco.id};
    this.navCtrl.push('PaymentPage', {pedido: this.pedido});
  }
}
