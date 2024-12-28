import { FormEvent, useRef } from "react";
import { Container, Button, Form, Alert } from "react-bootstrap";
import { addBook } from "../Api";
import { useMutation } from "react-query";
import { Link } from "react-router";
import { Book } from "../Model/Book";


export const AddBook = () => {
    const formRef = useRef<HTMLFormElement | null>(null);

    const mutation = useMutation<Book, Error, Book>(addBook)

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

        mutation.mutate(book);
        
    };

    return (
        <Container className="pt-5">
            <Link to="/books">Return to list</Link>
            <h2>Create New Book</h2>
            {mutation.isSuccess && (
                <Alert  variant="success">
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
                    />
                </Form.Group>

                <Form.Group controlId="formPublishDate" className="mb-3">
                    <Form.Label>Publish Date</Form.Label>
                    <Form.Control
                        type="date"
                        name="publishDate"
                        required
                        disabled={mutation.isLoading}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" disabled={mutation.isLoading}>
                    Create Book
                </Button>
            </Form>
        </Container>
    );
} 