/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { useRef, FormEvent } from "react";
import { Container, Button, Form, Alert } from "react-bootstrap";
import { useMutation, useQuery } from "react-query";
import { Link, useParams } from "react-router";
import { Author } from "../../Model/Author";
import { editAuthor, getAuthor } from "../../Api/Authors";
import { Loading } from "../../Components/Loading";

const EditAuthor = () => {

    const params = useParams();
    const formRef = useRef<HTMLFormElement | null>(null);

    const mutation = useMutation<Author, Error, { id: number; author: Author }>(editAuthor);

    const query = useQuery<Author, Error>(["author", "edit", params.id], async () => await getAuthor(params.id ?? ''))

    if (query.isLoading) {
        return <Loading />
    }

    if (query.isError) {
        return (
            <div style={{ display: "flex", flexDirection: 'column', placeItems: 'center', justifyContent: 'center', minHeight: "100vh" }}>
                <h4>{query.error.message}</h4>
                <Link to="/authors">Return to list</Link>
            </div>
        )
    }


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(formRef.current!);
        const author = {
            id: Number(formData.get('id')),
            idBook: Number(formData.get('idBook')),
            firstName: formData.get('firstName') as string,
            lastName: formData.get('lastName') as string,
        };

        mutation.mutate({ id: Number(params.id), author });

    };

    const item = query.data;

    return (
        <Container className="pt-5">
            <Link to="/authors">Return to list</Link>
            <h2>Edit Author: {`${item?.firstName} ${item?.lastName}`}</h2>
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
                        defaultValue={item?.id}
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
                        defaultValue={item?.idBook}
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
                        defaultValue={item?.firstName}
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
                        defaultValue={item?.lastName}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" disabled={mutation.isLoading}>
                    Edit Author
                </Button>
            </Form>
        </Container>
    );
}

export default EditAuthor;