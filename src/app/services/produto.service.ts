import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Produto } from "./api";

@Injectable({
    providedIn: 'root',
})
export class ProdutoService {
    private uri = 'http://localhost:8080/produto';
    constructor(private httpClient: HttpClient) { }
    delete(id: number) {
        return this.httpClient.delete(`${this.uri}/${id}`)
            .toPromise();
    }
    list() {
        return this.httpClient.get<Produto[]>(this.uri);
    }
}