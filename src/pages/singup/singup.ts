import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EstadoService } from '../../services/domain/estado.service';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeDTO } from '../../models/cidade.dto';
import { ClienteService } from '../../services/domain/cliente.service';

/**
 * Generated class for the SingupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-singup',
  templateUrl: 'singup.html',
})
export class SingupPage {

  formGroup: FormGroup;
  estados: EstadoDTO[];
  cidades: CidadeDTO[];

  constructor(public navCtrl: NavController,
     public navParams: NavParams, 
     public formBuilder: FormBuilder,
     public estadoService: EstadoService,
     public cidadeService: CidadeService,
     public clienteService: ClienteService,
     public alertCtrl: AlertController) {

    this.formGroup = this.formBuilder.group({
    nome : ['Joana',[Validators.required, Validators.minLength(5),Validators.maxLength(100)]],
    email: ['Joana@gmail.com',[Validators.required, Validators.email ]],
    tipo: ['1', [Validators.required]],
    cpfOuCnpj: ['45633314816',[Validators.required,Validators.minLength(11),Validators.maxLength(14)]],
    senha: ['1237',[Validators.required]],
    logradouro: ['Rua das Flores ',[Validators.required]],
    numero: ['356',[]],
    complemento: ['',[]],
    bairro: ['Av. Souza Lopes',[]],
    cep: ['08226015',[Validators.required]],
    telefone1: ['65141844',[Validators.required]],
    telefone2: ['', []],
    telefone3: ['',[]],
    estadoId: [null,[Validators.required]],
    cidadeId: [null,[Validators.required]]
    });
  }
  ionViewDidLoad(){
    this.estadoService.findAll()
    .subscribe(response => {
      this.estados = response;
      this.formGroup.controls.estadoId.setValue(this.estados[0].id);
      this.updateCidades();
    },
    error => {});
  }
  updateCidades(){
    let estado_id = this.formGroup.value.estadoId;
    this.cidadeService.findAll(estado_id)
    .subscribe(response => {
      this.cidades = response;
      this.formGroup.controls.cidadeId.setValue(null);
    },
    error => {});
  }

  SingupUser(){
    this.clienteService.insert(this.formGroup.value)
    .subscribe( response => {
    this.showInsertOk();
    },
    error => {});
  }
  showInsertOk(){
    let alert = this.alertCtrl.create( {
      title: 'Sucesso',
      message: 'Cadastro efetuado com sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.popTo('HomePage');
          }
        }
      ]
    });
    alert.present();
  }
}
