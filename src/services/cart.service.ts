import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Cart } from "../models/cart";
import { StoregeService } from "./estorege.service";
import { ProdutoDTO } from "../models/produto.dto";

@Injectable()
export class CartService {
    constructor (public http: HttpClient,
        public storege: StoregeService){

    }

    creatOrClearCart(): Cart{
        let cart: Cart = {items: []};
        this.storege.setCart(cart);
        return cart;
    }

    getCart() : Cart{
        let cart: Cart = this.storege.getCart();
        if(cart == null){
            cart = this.creatOrClearCart();
        }
        return cart;
    }

    addProduto(produto: ProdutoDTO) : Cart{
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        if(position == -1){
            cart.items.push({
                quantidade: 1,
                produto:produto
            });
        }
        this.storege.setCart(cart);
        return cart;
    }
}