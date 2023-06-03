export interface IPokemon {
    count: number;
    next: string;
    previous: number;
    results: IResult[]
}

interface IResult {
    name: string;
    url: string;
}