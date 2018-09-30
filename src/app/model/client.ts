import { Face } from "./Face";

export class  Client {
    constructor(
    public nome: string,
    public rg: string,
    public cpf: string,
    public telefone: string,
    public email: string,
    public faces: Face[] = []
    ) {}
}

