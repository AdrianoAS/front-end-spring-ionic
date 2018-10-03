import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EstadoService } from '../../services/domain/estado.service';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeDTO } from '../../models/cidade.dto';

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
     public cidadeService: CidadeService) {

    this.formGroup = this.formBuilder.group({
    nome : ['',[Validators.required, Validators.minLength(5),Validators.maxLength(100)]],
    email: ['',[Validators.required, Validators.email ]],
    tipo: ['', [Validators.required]],
    cpfOuCnpj: ['',[Validators.required,Validators.minLength(11),Validators.maxLength(14)]],
    senha: ['',[Validators.required]],
    logradouro: [' ',[Validators.required]],
    numero: ['',[]],
    complemento: ['',[]],
    bairro: ['',[]],
    cep: ['',[Validators.required]],
    telefone1: ['',[Validators.required]],
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
    console.log("Envio o form");
  }
}
