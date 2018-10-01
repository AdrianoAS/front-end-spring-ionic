import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { ClienteDTO } from "../../models/cliente.dto";
import { API_CONFIG } from "../../config/api.config";
import { StoregeService } from "../estorege.service";
import { Token } from "@angular/compiler";

@Injectable()
export class ClienteService{

    constructor(public http: HttpClient, public storege: StoregeService){
    }

    findByEmail(email: string) : Observable<ClienteDTO>{

        let token = this.storege.getLocalUser().token;
        let authHeader = new HttpHeaders({'Authorization': 'Bearer ' + token });

        return this.http.get<ClienteDTO>(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`,{'headers': authHeader});
    }

    getImageFromBucket(id: string) : Observable<any>{
        let url  = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`;
        return this.http.get(url, {responseType: 'blob'});
    }
}