import { Client } from "./client";

export class Face {
    constructor (
    public persistedFaceId: string,
    public base64image: string,
    public client: Client
    ) {}
}