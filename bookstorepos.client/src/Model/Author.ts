import { Author } from "./Book";


export interface Author {
    id: number;
    idBook: number;
    firstName: string;
    lastName: string;
    book?: Author;
}