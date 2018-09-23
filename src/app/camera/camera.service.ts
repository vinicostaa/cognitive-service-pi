import { Injectable } from "../../../node_modules/@angular/core";

@Injectable()
export class CameraService {
    public context: string;

    addPhoto(context: string){
        this.context = context;
        console.log(this.context);
    }
}