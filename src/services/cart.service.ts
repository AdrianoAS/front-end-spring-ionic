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
    removeProduo(produto: ProdutoDTO): Cart{
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        if(position != -1){
            cart.items.splice(position, 1)
        }
        this.storege.setCart(cart);
        return cart;
    }
    increaseQuantity(produto: ProdutoDTO) :Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        if(position != -1){
            cart.items[position].quantidade++;
        }
        this.storege.setCart(cart);
        return cart;
    }
    decreaseQuantity(produto: ProdutoDTO) : Cart{
        let cart = this.getCart();
        let position = cart.items.findIndex(x=> x.produto.id == produto.id);
        if(position != -1){
            cart.items[position].quantidade--;
            if(cart.items[position].quantidade < 1){
                cart = this.removeProduo(produto);
            }
        }
        this.storege.setCart(cart);
        return cart;
    }
    total() : number {
        let cart = this.getCart();
        let sum =0;
        for(var i=0;i<cart.items.length;i++){
            sum += cart.items[i].produto.preco * cart.items[i].quantidade;
        }
        return sum;
    }
}