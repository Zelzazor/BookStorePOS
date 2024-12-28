import { Book } from "../Model/Book";


const statusCodes = {
    404: 'The book was not found',
    400: 'There was a mistake with the request, please check your input and try again.'
} as const

export const getAllBooks = async () => {
    const response = await fetch("/api/Book");

    const data = await response.json()


    return data;
}

export const getBook = async (id: string) => {
    const response = await fetch(`/api/Book/${id}`);

    if (!response.ok) {
        throw new Error(statusCodes[response.status as 404 | 400] ? statusCodes[response.status as 404 | 400] : 'An unexpected Error has occurred.')
    }

    const data = await response.json();

    return data;
}

export const addBook = async (book: Book) => {
    const response = await fetch("/api/Book", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
    })

    if (!response.ok) {
        throw new Error(statusCodes[response.status as 404 | 400] ? statusCodes[response.status as 404 | 400] : 'An unexpected Error has occurred.')
    }

    const data = await response.json();

    return data;
}

export const editBook = async ({ id, book }: { id: number; book: Book }) => {
    const response = await fetch(`/api/Book/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
    })

    if (!response.ok) {
        throw new Error(statusCodes[response.status as 404 | 400] ? statusCodes[response.status as 404 | 400] : 'An unexpected Error has occurred.')
    }

    const data = await response.json();

    

    return data;
}

export const deleteBook = async (id: number) => {
    const response = await fetch(`/api/Book/${id}`, {
        method: 'DELETE'
    })

    return response.ok ? true : false;
}