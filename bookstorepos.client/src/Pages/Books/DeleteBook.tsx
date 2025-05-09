import { Container, Button, Alert } from "react-bootstrap";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router";
import { deleteBook, getBook } from "../../Api/Books";
import { useNavigate } from "react-router";
import { Author } from "../../Model/Book";
import { Link } from "react-router";
import { useState } from "react";
import { Loading } from "../../Components/Loading";

const DeleteBook = () => {

    const params = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const mutation = useMutation(deleteBook, {
        onSuccess: (success: boolean) => {
            if (!success) return setError(true);
            navigate("/books")
        }
    });
    const query = useQuery<Author, Error>(["book", "delete", params.id], async () => await getBook(params.id ?? ''))



    const handleCancel = () => {
        navigate(-1);
    };

    
    const onSubmit = () => {
        mutation.mutate(Number(params.id))
    }

    if (query.isError) {
        return (
            <div style={{ display: "flex", flexDirection: 'column', placeItems: 'center', justifyContent: 'center', minHeight: "100vh" }}>
                <h4>{query.error.message}</h4>
                <Link to="/books">Return to list</Link>
            </div>
        )
    }


    if (query.isLoading) {
        return <Loading />
    }

    const item = query.data;

    return (
        <Container className="pt-5 text-center">
            <h2>Confirm Deletion</h2>
            {error && (
                <Alert variant="danger">
                    The book was not deleted due to an unexpected error. Please try again later.
                </Alert>
            )}
            <p>Are you sure you want to delete the book "{item?.title}"?</p>
            <div className="mt-4">
                <Button variant="secondary" onClick={handleCancel} disabled={mutation.isLoading} className="me-3">
                    Cancel
                </Button>
                <Button variant="danger" onClick={onSubmit} disabled={mutation.isLoading}>
                    Delete
                </Button>
            </div>
        </Container>
    )
} 

export default DeleteBook;