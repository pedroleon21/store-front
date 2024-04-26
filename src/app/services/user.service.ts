import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User, Usuario } from "./api";

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private uri = 'http://localhost:8080/user';
    constructor(private httpClient: HttpClient) { }
    find(userId: number) {
        return this.httpClient.get<Usuario>(`${this.uri}/${userId}`)
            .toPromise();
    }
    createNew(data: User) {
        return this.httpClient.post<any>(`${this.uri}`, data)
            .toPromise();
    }
}