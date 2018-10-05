import { Injectable } from "@angular/core";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { LocalUser } from "../models/local_users";
import { StoregeService } from "./estorege.service";
import {JwtHelper} from 'angular2-jwt';
import { CartService } from "./cart.service";

@Injectable()
export class AuthService{

    jwtHelper: JwtHelper = new JwtHelper();

   constructor(public http: HttpClient, 
    public storege: StoregeService ,
    public cartService: CartService){

   }

   authenticate (creds: CredenciaisDTO){
       return this.http.post(`${API_CONFIG.baseUrl}/login`,creds,
        {
            observe: 'response',
            responseType: 'text'
        });
   }
   refreshToken (){
    return this.http.post(`${API_CONFIG.baseUrl}/auth/refresh_token`,{},
     {
         observe: 'response',
         responseType: 'text'
     });
}
   successfullLogin(authorizationValue: string){
    let tok = authorizationValue.substring(7);
    let user : LocalUser = {
        token: tok,
        email: this.jwtHelper.decodeToken(tok).sub
    };
    this.storege.setLocalUser(user);
    this.cartService.creatOrClearCart();
 }    

    logout(){
        this.storege.setLocalUser(null);
    }
}