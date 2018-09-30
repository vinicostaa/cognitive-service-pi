import { Injectable } from "@angular/core";

@Injectable()
export class CameraService {
    public context: string;

    public contextAdd: string;
    public contextDetect: string;

    addPhoto(context: string){
        this.context = context;
        console.log(this.context);
    }
}