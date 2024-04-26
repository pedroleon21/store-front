import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Auth } from "./api";

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    private uri = 'http://localhost:8080/auth';
    constructor(private httpClient: HttpClient) { }
    login(data: Auth) {
        return this.httpClient.post<any>(this.uri, data)
            .toPromise();
    }
}