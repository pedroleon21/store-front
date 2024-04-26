import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "./api";

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private uri = 'http://localhost:8080/user';
    constructor(private httpClient: HttpClient) { }
    createNew(data: User) {
        return this.httpClient.post<any>(`${this.uri}`, data)
            .toPromise();
    }
}