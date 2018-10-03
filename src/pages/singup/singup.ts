import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder) {

    this.formGroup = this.formBuilder.group({
    nome : ['Joaqion',[Validators.required, Validators.minLength(5),Validators.maxLength(100)]],
    email: ['Joaquin@gmail.com',[Validators.required, Validators.email ]],
    tipo: ['1', [Validators.required]],
    cpfOuCnpj: ['06134596280',[Validators.required,Validators.minLength(11),Validators.maxLength(14)]],
    senha: ['1237',[Validators.required]],
    logradouro: ['Rua via',[Validators.required]],
    numero: ['341',[]],
    complemento: ['Apto 3',[]],
    bairro: ['Copacabana',[]],
    cep: ['08226015',[Validators.required]],
    telefone1: ['20452912',[Validators.required]],
    telefone2: ['', []],
    telefone3: ['',[]],
    estadoId: [null,[Validators.required]],
    cidadeId: [null,[Validators.required]]
    });
    

  }

  SingupUser(){
    console.log("Envio o form");
  }
}
