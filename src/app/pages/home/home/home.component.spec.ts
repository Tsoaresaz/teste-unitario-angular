import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from "./home.component";
import { PokemonService } from '../services/pokemon.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { dataMockPokemon } from 'src/app/mocks/mock';

describe(HomeComponent.name, () => {
    let fixture: ComponentFixture<HomeComponent>;
    let component: HomeComponent;
    let service: PokemonService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                HomeComponent
            ],
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                PokemonService
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        service = TestBed.inject(PokemonService);
    });

    it('should create component', () => {
        expect(component).toBeTruthy();
    });

    it(`should property (title) defined`, () => {
        expect(component.title).toBeDefined();
    });

    it(`should property (title) is not undefined`, () => {
        expect(component.title)
            .withContext('verificar se o title está definido')
            .not.toBeUndefined();
    });

    it('should set property (title) new value', () => {
        const new_text = 'Hello World!';
        component.title = new_text;
        expect(component.title).toEqual(new_text);
    });

    it('(D) should exist the display text (title)', () => {
        const debugElement = fixture.debugElement.nativeElement as HTMLElement;
        expect(debugElement.querySelector('#home')?.textContent).toBe('home works!');
    });

    it('should test called service the component', () => {
        spyOn<any>(component, 'getPokemons');
        component['getPokemons']();
        expect(component['getPokemons']).toHaveBeenCalled();
    });

    it('should test called service the component return data mock', () => {
        spyOn(service, 'getAllPokemons').and.returnValue(of(dataMockPokemon));
        component['getPokemons']();
        expect(service.getAllPokemons).toHaveBeenCalled();
    });

    it('should test called service the component return data mock test property (pokemons)', done => {
        spyOn(service, 'getAllPokemons').and.returnValue(of(dataMockPokemon));
        component['getPokemons']();
        service.getAllPokemons().subscribe(resp => {
            component.pokemons = resp;
            expect(resp).toBeDefined();
            expect(component.pokemons).toBe(resp);
            done();
        })
        expect(service.getAllPokemons).toHaveBeenCalled();
    });

    it('should test when called return error request', done => {
        const errorMock = { status: 400, statusText: 'Error response'};
        spyOn(service, 'getAllPokemons').and.returnValue(throwError(errorMock));
        component['getPokemons']();
        service.getAllPokemons().subscribe(resp => {
            fail('Expected');
        },
        (error) => {
            expect(error).toBe(errorMock);
            done();
        })
        expect(service.getAllPokemons).toHaveBeenCalled();
    });
});