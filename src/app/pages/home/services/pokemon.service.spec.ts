import { TestBed } from '@angular/core/testing';
import { PokemonService } from "./pokemon.service";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { dataMockPokemon } from 'src/app/mocks/mock';

describe(PokemonService.name, () => {
    let service: PokemonService;
    let httpController: HttpTestingController;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                PokemonService
            ]
        }).compileComponents();

        service = TestBed.inject(PokemonService);
        httpController = TestBed.inject(HttpTestingController);
    });

    afterAll(() => {
        httpController.verify();
    });

    it('should create service', () => {
        expect(service).toBeTruthy();
    });

    it('should test when called', () => {
        spyOn(service, 'getAllPokemons');
        service.getAllPokemons();
        expect(service.getAllPokemons).toHaveBeenCalled();
    });

    it('should test when called data mock', () => {
        spyOn(service, 'getAllPokemons').and.returnValues(of(dataMockPokemon));
        service.getAllPokemons();
        expect(service.getAllPokemons).toHaveBeenCalledWith();
    });

    it('should test when called return data', done => {
        service.getAllPokemons().subscribe(resp => {
            expect(resp).toBe(dataMockPokemon);
            done();
        });

        httpController
            .expectOne('https://pokeapi.co/api/v2/pokemon')
            .flush(dataMockPokemon);
    });

    it('should when called count equal dataMockPokemon.count', done => {
        spyOn(service, 'getAllPokemons').and.returnValue(of(dataMockPokemon));
        service.getAllPokemons().subscribe(resp => {
            expect(resp.count).toEqual(dataMockPokemon.count);
            done();
        });
        expect(service.getAllPokemons).toHaveBeenCalledTimes(1);
    });
});
