import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs/Rx";


export class ErrorInterceptor implements HttpInterceptor{
    


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("Passou");
        return next.handle(req)
        .catch((error, caught) =>{
            let errorObj = error;
            if(errorObj.error){
                errorObj = error;
            }
                if(!errorObj.status){
                    errorObj = JSON.parse(errorObj);
                }

                console.log("Error detectado pelo interceptor");
                console.log(errorObj);

            return Observable.throw(errorObj);
        }) as any;
    }

}

 export const ErrorInterceptorProvides = {
     provide: HTTP_INTERCEPTORS,
     useClass: ErrorInterceptor,
     multi: true,
 };