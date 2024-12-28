/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { useRef, FormEvent } from "react";
import { Container, Button, Form, Spinner, Alert } from "react-bootstrap";
import { useMutation, useQuery } from "react-query";
import { Link, useParams } from "react-router";
import { editBook, getBook } from "../Api";
import { toLocalISOString } from "../Helpers";
import { Book } from "../Model/Book";

export const EditBook = () => {

    const params = useParams();
    const formRef = useRef<HTMLFormElement | null>(null);

    const mutation = useMutation<Book, Error, { id: number; book: Book }>(editBook);

    const query = useQuery<Book, Error>(["book", "edit", params.id], async () => await getBook(params.id ?? ''))

    if (query.isLoading) {
        return (
            <div style={{ display: "flex", placeItems: 'center', justifyContent: 'center', minHeight: "100vh" }}>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>

        )
    }

    if (query.isError) {
        return (
            <div style={{ display: "flex", flexDirection: 'column', placeItems: 'center', justifyContent: 'center', minHeight: "100vh" }}>
                <h4>{query.error.message}</h4>
                <Link to="/books">Return to list</Link>
            </div>
        )
    }


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(formRef.current!);
        const book = {
            id: Number(formData.get('id')),
            title: formData.get('title') as string,
            description: formData.get('description') as string,
            pageCount: Number(formData.get('pageCount')),
            excerpt: formData.get('excerpt') as string,
            publishDate: formData.get('publishDate') as string,
        };

        mutation.mutate({ id: Number(params.id), book });

    };

    const item = query.data;

    return (
        <Container className="pt-5">
            <Link to="/books">Return to list</Link>
            <h2>Edit Book: {item?.title}</h2>
            {mutation.isSuccess && (
                <Alert variant="success">
                    Book was added successfully!
                </Alert>
            )}
            {mutation.isError && (
                <Alert variant="danger">
                    {mutation.error.message}
                </Alert>
            )}
            <Form ref={formRef} onSubmit={handleSubmit}>
                <Form.Group controlId="formBookId" className="mb-3">
                    <Form.Label>ID</Form.Label>
                    <Form.Control
                        type="number"
                        name="id"
                        placeholder="Enter book ID"
                        required
                        disabled={mutation.isLoading}
                        defaultValue={item?.id}
                    />
                </Form.Group>

                <Form.Group controlId="formBookTitle" className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        placeholder="Enter book title"
                        required
                        disabled={mutation.isLoading}
                        defaultValue={item?.title}
                    />
                </Form.Group>

                <Form.Group controlId="formBookDescription" className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="description"
                        placeholder="Enter book description"
                        disabled={mutation.isLoading}
                        defaultValue={item?.description}
                    />
                </Form.Group>

                <Form.Group controlId="formPageCount" className="mb-3">
                    <Form.Label>Page Count</Form.Label>
                    <Form.Control
                        type="number"
                        name="pageCount"
                        placeholder="Enter number of pages"
                        required
                        disabled={mutation.isLoading}
                        defaultValue={item?.pageCount}
                    />
                </Form.Group>

                <Form.Group controlId="formExcerpt" className="mb-3">
                    <Form.Label>Excerpt</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={2}
                        name="excerpt"
                        placeholder="Enter a short excerpt"
                        disabled={mutation.isLoading}
                        defaultValue={item?.excerpt}
                    />
                </Form.Group>

                <Form.Group controlId="formPublishDate" className="mb-3">
                    <Form.Label>Publish Date</Form.Label>
                    <Form.Control
                        type="datetime-local"
                        name="publishDate"
                        required
                        disabled={mutation.isLoading}
                        defaultValue={toLocalISOString(new Date(item?.publishDate!))}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" disabled={mutation.isLoading}>
                    Edit Book
                </Button>
            </Form>
        </Container>
    );
} 
