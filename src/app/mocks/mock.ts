import { IPokemon } from "../pages/home/interfaces/pokemon.interface";

export const dataMockPokemon: IPokemon = {
    count: 1,
    next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
    previous: 0,
    results: [
        {
            name: 'bulbasaur',
            url: 'https://pokeapi.co/api/v2/pokemon/1/'
        }
    ]
}