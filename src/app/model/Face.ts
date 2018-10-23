import { Client } from "./client";
import { Cantidate } from "./cantidate";

export class Face {
    constructor (
    public persistedFaceId: string,
    public base64image: string,
    public client: Client,
    public cantidates: Cantidate[] = []
    ) {}

}