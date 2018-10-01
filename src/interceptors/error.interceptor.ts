import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { StoregeService } from "../services/estorege.service";
import { Injectable } from "@angular/core";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{
    
    constructor(public storege: StoregeService){
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("Passou");
        return next.handle(req)
        .catch((error, caught) => {
            let errorObj = error;
            if(errorObj.error){
                errorObj = error;
            }
                if(!errorObj.status){
                    errorObj = JSON.parse(errorObj);
                }
                console.log("Error detectado pelo interceptor");
                console.log(errorObj);
                switch(errorObj.status) {
                    case 403:
                    this.handle403();
                    break;
                }
            return Observable.throw(errorObj);
        }) as any;
    }
    handle403() {
        this.storege.setLocalUser(null);
  }
}

 export const ErrorInterceptorProvides = {
     provide: HTTP_INTERCEPTORS,
     useClass: ErrorInterceptor,
     multi: true,
 };