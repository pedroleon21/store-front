import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Loja, LojaForm, PageResult } from "./api";
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
    list(userId?: number, pageIndex?: number, pageSize?: number) {
        return this.httpClient.get<PageResult<Loja>>(`${this.uri}`, {
            params: {

                pageIndex,
                pageSize
            }
        })
    }
    delete(id: number) {
        return this.httpClient.delete(`${this.uri}/${id}`)
            .toPromise()
    }
}