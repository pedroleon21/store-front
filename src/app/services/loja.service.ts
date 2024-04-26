import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Loja, LojaForm } from "./api";
@Injectable({
    providedIn: 'root',
})
export class LojaService {
    private uri = 'http://localhost:8080/loja';
    constructor(private httpClient: HttpClient) { }
    create(data: LojaForm) {
        return this.httpClient.post<Loja>(this.uri, data)
            .toPromise()
    }
    list(userId: number) {
        return this.httpClient.get<Loja[]>(`${this.uri}`, {
            params: {
                userId
            }
        })
    }
}