import { FormEvent, useRef } from "react";
import { Container, Button, Form, Alert } from "react-bootstrap";
import { useMutation } from "react-query";
import { Link } from "react-router";
import { addAuthor } from "../../Api/Authors";
import { Author } from "../../Model/Author";


const AddAuthor = () => {
    const formRef = useRef<HTMLFormElement | null>(null);

    const mutation = useMutation<Author, Error, Author>(addAuthor)

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(formRef.current!);
        const author = {
            id: Number(formData.get('id')),
            idBook: Number(formData.get('idBook')),
            firstName: formData.get('firstName') as string,
            lastName: formData.get('lastName') as string,
        };

        mutation.mutate(author);

    };

    return (
        <Container className="pt-5">
            <Link to="/authors">Return to list</Link>
            <h2>Create New Author</h2>
            {mutation.isSuccess && (
                <Alert variant="success">
                    Author was added successfully!
                </Alert>
            )}
            {mutation.isError && (
                <Alert variant="danger">
                    {mutation.error.message}
                </Alert>
            )}
            <Form ref={formRef} onSubmit={handleSubmit}>
                <Form.Group controlId="formAuthorId" className="mb-3">
                    <Form.Label>ID</Form.Label>
                    <Form.Control
                        type="number"
                        name="id"
                        placeholder="Enter author ID"
                        required
                        disabled={mutation.isLoading}
                    />
                </Form.Group>
                <Form.Group controlId="formBookId" className="mb-3">
                    <Form.Label>Book ID</Form.Label>
                    <Form.Control
                        type="number"
                        name="idBook"
                        placeholder="Enter book ID"
                        required
                        disabled={mutation.isLoading}
                    />
                </Form.Group>

                <Form.Group controlId="formAuthorFirstName" className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="firstName"
                        placeholder="Enter author First Name"
                        required
                        disabled={mutation.isLoading}
                    />
                </Form.Group>

                <Form.Group controlId="formAuthorLastName" className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="lastName"
                        placeholder="Enter author Last Name"
                        required
                        disabled={mutation.isLoading}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" disabled={mutation.isLoading}>
                    Create Author
                </Button>
            </Form>
        </Container>
    );
}

export default AddAuthor;