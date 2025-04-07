import { Author } from "../../Model/Author";
import { statusCodes } from "../Constants";


const url = "/api/authors";

export const getAllAuthors = async () => {
    const response = await fetch(`${url}`);


    const data = await response.json()

    return data;
}

export const getAuthor = async (id: string) => {
    const response = await fetch(`${url}/${id}`);

    if (!response.ok) {
        throw new Error(statusCodes.authors[response.status as 404 | 400] ? statusCodes.authors[response.status as 404 | 400] : 'An unexpected Error has occurred.')
    }

    const data = await response.json();

    return data;
}

export const addAuthor = async (author: Author) => {
    const response = await fetch(`${url}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(author)
    })

    if (!response.ok) {
        throw new Error(statusCodes.authors[response.status as 404 | 400] ? statusCodes.authors[response.status as 404 | 400] : 'An unexpected Error has occurred.')
    }

    const data = await response.json();

    return data;
}

export const editAuthor = async ({ id, author }: { id: number; author: Author }) => {
    const response = await fetch(`${url}/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(author)
    })

    if (!response.ok) {
        throw new Error(statusCodes.authors[response.status as 404 | 400] ? statusCodes.authors[response.status as 404 | 400] : 'An unexpected Error has occurred.')
    }

    const data = await response.json();



    return data;
}

export const deleteAuthor = async (id: number) => {
    const response = await fetch(`${url}/${id}`, {
        method: 'DELETE'
    })

    return response.ok ? true : false;
}