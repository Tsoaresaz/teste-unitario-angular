import { Component, OnInit } from "@angular/core";
import { PokemonService } from "../services/pokemon.service";
import { HttpErrorResponse } from "@angular/common/http";
import { IPokemon } from "../interfaces/pokemon.interface";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    title = 'home works!';
    pokemons!: IPokemon;
    isLoader!: boolean;
    isData!: boolean;

    constructor(private pokemonService: PokemonService) {}

    ngOnInit(): void {
       this.getPokemons();
    }

    private getPokemons(): void {
        this.pokemonService.getAllPokemons().subscribe({
            next: (resp: IPokemon) => {
                if (resp.count > 0) {
                    console.log('resp pokemon: ', resp);
                    this.pokemons = resp;
                }
            },
            error: (error: HttpErrorResponse) => {
                console.error('error response: ', error);
            },
            complete: () => console.log('response complete')
        });
    }
}
