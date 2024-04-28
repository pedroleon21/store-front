import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PageResult, Produto, ProdutoFrom } from "./api";

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
    list(pageIndex: number, pageSize: number) {
        return this.httpClient.get<PageResult<Produto>>(this.uri, {
            params: {
                pageIndex, pageSize
            }
        });
    }
    create(form: ProdutoFrom) {
        return this.httpClient.post<void>(`${this.uri}`, form)
    }
    find(id: number) {
        return this.httpClient.get<Produto>(`${this.uri}/${id}`)
    }
    update(form: Produto) {
        return this.httpClient.put<Produto>(`${this.uri}`, form)
    }
}