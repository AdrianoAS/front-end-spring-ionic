import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { StoregeService } from "../services/estorege.service";
import { Injectable } from "@angular/core";
import { AlertController} from "ionic-angular";
import { FieldMessage } from "../models/filedmessage.dto";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{
    
    constructor(public storege: StoregeService, public alertCtrl: AlertController){
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
                    case 401:
                    this.handle401();
                    break;

                    case 403:
                    this.handle403();
                    break;
                    
                    case 422:
                    this.handle422(errorObj);
                    break;

                    default:
                    this.handleDefaultError(errorObj);
                    break;
                }
            return Observable.throw(errorObj);
        }) as any;
    }
    handle401(){
        let alert = this.alertCtrl.create({
            title: 'Erro 401: Falha na autenticação',
            message: 'Email ou senha incorretos',
            enableBackdropDismiss: false,
            buttons : [
                {
                    text: 'Ok'
                }
            ]
        });
        alert.present();
    }

    handle403() {
        this.storege.setLocalUser(null);
  }

  handle422(errorObj){
    let alert = this.alertCtrl.create({
        title: 'Erro de validação',
        message: this.listErrors(errorObj.errors),
        enableBackdropDismiss: false,
        buttons : [
            {
                text: 'Ok'
            }
        ]
    });
    alert.present();
}

  handleDefaultError(errorObj){
    let alert = this.alertCtrl.create({
        title: 'Erro ' + errorObj.status  + ': ' + errorObj.error,
        message: errorObj.message,
        enableBackdropDismiss: false,
        buttons : [
            {
                text: 'Ok'
            }
        ]
    });
    alert.present();
  }
  
private listErrors(messages: FieldMessage[]):string {
    let s : string = '';
    for(var i=0;i<messages.length;i++){
        s = s + '<p><strong>' + messages[i].fieldName + "</strong>:" + messages[i].message + '</p>';
    }
    return s;
}

}

 export const ErrorInterceptorProvides = {
     provide: HTTP_INTERCEPTORS,
     useClass: ErrorInterceptor,
     multi: true,
 };