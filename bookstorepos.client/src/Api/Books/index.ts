import { Author } from "../../Model/Book";
import { statusCodes } from "../Constants";


const url = "/api/books";

export const getAllBooks = async () => {
    const response = await fetch(`${url}`);

    const data = await response.json()


    return data;
}

export const getBook = async (id: string) => {
    const response = await fetch(`${url}/${id}`);

    if (!response.ok) {
        throw new Error(statusCodes.books[response.status as 404 | 400] ? statusCodes.books[response.status as 404 | 400] : 'An unexpected Error has occurred.')
    }

    const data = await response.json();

    return data;
}

export const addBook = async (book: Author) => {
    const response = await fetch(`${url}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
    })

    if (!response.ok) {
        throw new Error(statusCodes.books[response.status as 404 | 400] ? statusCodes.books[response.status as 404 | 400] : 'An unexpected Error has occurred.')
    }

    const data = await response.json();

    return data;
}

export const editBook = async ({ id, book }: { id: number; book: Author }) => {
    const response = await fetch(`${url}/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
    })

    if (!response.ok) {
        throw new Error(statusCodes.books[response.status as 404 | 400] ? statusCodes.books[response.status as 404 | 400] : 'An unexpected Error has occurred.')
    }

    const data = await response.json();



    return data;
}

export const deleteBook = async (id: number) => {
    const response = await fetch(`${url}/${id}`, {
        method: 'DELETE'
    })

    return response.ok ? true : false;
}