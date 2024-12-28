import { useQuery } from "react-query";
import { getAllBooks } from "../Api";
import ListGroup from 'react-bootstrap/ListGroup';
import { Book } from "../Model/Book";
import Spinner from 'react-bootstrap/Spinner';
import { Button, Form } from "react-bootstrap";
import { FormEvent } from "react";
import { Link, useNavigate } from "react-router";

export const BookList = () => {

    const query = useQuery('books', getAllBooks);
    const navigate = useNavigate();

    const navigateToDetail = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const value = e.currentTarget.searchId.value;

        navigate(`/books/${value}`)

    }

    if (query.isLoading) {
        return (
        <div style={{ display: "flex", placeItems: 'center', justifyContent: 'center', minHeight: "100vh" }}>
           <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
           </Spinner>
        </div>   
        
        )
    }
    return (
        <section className="p-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h1>Books</h1>
                <Form onSubmit={navigateToDetail} className="w-75">
                    <Form.Group controlId="searchForm.SearchInput">
                        <Form.Control type="number" name="searchId" placeholder="Search Book by Id..." />
                    </Form.Group>
                </Form>
            </div>
            <div className="w-100 mb-5">
                <Link to="/books/add">
                    <Button className="w-100" variant="success">Add Book</Button>
                </Link>
            </div>
            <ListGroup>
                {query.data?.map?.((item: Book) => (
                    <ListGroup.Item key={item.id}>
                        <div className="d-flex justify-content-between">
                            <div>
                                <h2>{item.title}</h2>
                                <p>{item.description}</p>
                            </div>
                            <div>
                                <p>Publish date: {(new Date(item.publishDate)).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                <div className="d-flex justify-content-end" style={{ gap: "1rem"}} >
                                    <Link to={`/books/${item.id}`}><Button variant="primary">Details</Button></Link>
                                    <Link to={`/books/edit/${item.id}`}><Button variant="secondary">Edit</Button></Link>
                                    <Link to={`/books/delete/${item.id}`}><Button variant="danger">Delete</Button></Link>
                                </div>
                                
                            </div>
                        </div>
                    </ListGroup.Item>
            ))}
        </ListGroup>
        </section>
    )
}