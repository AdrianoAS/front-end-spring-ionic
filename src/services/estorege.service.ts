import { Injectable } from "@angular/core";
import { LocalUser } from "../models/local_users";
import { STOREGE_KEYS } from "../config/storege_Keys.config";


@Injectable()
export class StoregeService{

    getLocalUser() : LocalUser {
        let urs = localStorage.getItem(STOREGE_KEYS.localUser);
        if(urs== null){
            return null;
        }else{
            return JSON.parse(urs);
        }
    }
    setLocalUser(obj : LocalUser){
        if(obj == null){
            localStorage.removeItem(STOREGE_KEYS.localUser);
        }else{
        localStorage.setItem(STOREGE_KEYS.localUser, JSON.stringify(obj));
        }
    }
}