import { Injectable } from "@angular/core";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { LocalUser } from "../models/local_users";
import { StoregeService } from "./estorege.service";

@Injectable()
export class AuthService{

   constructor(public http: HttpClient, public storege: StoregeService ){

   }

   authenticate (creds: CredenciaisDTO){
       return this.http.post(`${API_CONFIG.baseUrl}/login`,creds,
        {
            observe: 'response',
            responseType: 'text'
        });
   }
   successfullLogin(authorizationValue: string){
    let tok = authorizationValue.substring(7);
    let user : LocalUser = {
        token: tok
    };
    this.storege.setLocalUser(user);
 }    

    logout(){
        this.storege.setLocalUser(null);
    }
}