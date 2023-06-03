import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment as env } from '../../../../environments/environment';
import { tap } from 'rxjs/operators';
import { Observable } from "rxjs";
import { IPokemon } from "../interfaces/pokemon.interface";

@Injectable({
    providedIn: 'root'
})
export class PokemonService {

    constructor(private http: HttpClient) {}

    getAllPokemons(): Observable<IPokemon> {
        return this.http.get<IPokemon>(`${env.API_POKEMON}/pokemon`);
    }
}
