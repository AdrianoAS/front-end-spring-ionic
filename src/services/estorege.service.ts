import { Injectable } from "@angular/core";
import { LocalUser } from "../models/local_users";
import { STOREGE_KEYS } from "../config/storege_Keys.config";
import { Cart } from "../models/cart";


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

    getCart() : Cart {
        let str = localStorage.getItem(STOREGE_KEYS.cart);
        if(str != null){
            return JSON.parse(str);
        }else{
            return null;
        }
    }
    setCart(obj : Cart){
        if(obj != null){
            localStorage.setItem(STOREGE_KEYS.cart, JSON.stringify(obj));
        }else{
            localStorage.removeItem(STOREGE_KEYS.cart);
        }
    }
}