import { Injectable } from "@angular/core";

@Injectable()
export class ImageUtilService{
    dataUriToblob(dataURI){
        var byString = atob(dataURI.split(',')[1]);
        var mimiString = dataURI.split(',')[0].split(':')[1].split(':')[0];
        var ab = new ArrayBuffer(byString.length);
        var ia = new Uint8Array(ab);
        for(var i=0;i<byString.length;i++){
            ia[i] = byString.charCodeAt(i);
        }
        return new Blob([ab], {type: mimiString});
    }
}