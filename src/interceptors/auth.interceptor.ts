import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { StoregeService } from "../services/estorege.service";
import { API_CONFIG } from "../config/api.config";


@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    

    constructor(public storege: StoregeService){
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      
        let localUser = this.storege.getLocalUser();
        let N  = API_CONFIG.baseUrl.length;
        let responseToApi = req.url.substring(0, N) == API_CONFIG.baseUrl;

        if(localUser && responseToApi){
            const authReq = req.clone({headers: req.headers.set('Authorization','Bearer ' + localUser.token )});
            return next.handle(authReq);
        }else{
            return next.handle(req)
        }

    } 
}

 export const AuthInterceptorProvider = {
     provide: HTTP_INTERCEPTORS,
     useClass: AuthInterceptor,
     multi: true,
 };