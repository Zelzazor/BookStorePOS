import { useQuery } from "react-query";
import { getAllAuthors } from "../../Api/Authors";
import ListGroup from 'react-bootstrap/ListGroup';
import { Button, Form, Nav, Navbar } from "react-bootstrap";
import { FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import { Author } from "../../Model/Author";
import { Loading } from "../../Components/Loading";

const AuthorList = () => {

    const query = useQuery<Author[]>('authors', getAllAuthors);
    const navigate = useNavigate();

    const navigateToDetail = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const value = e.currentTarget.searchId.value;

        navigate(`/authors/${value}`)

    }

    if (query.isLoading) {
        return <Loading />
    }

    return (
        <section className="p-3">
            <header className="d-flex justify-content-between align-items-center mb-3">
                <h1>Authors</h1>
                <Form onSubmit={navigateToDetail} className="w-75">
                    <Form.Group controlId="searchForm.SearchInput">
                        <Form.Control type="number" name="searchId" placeholder="Search Author by Id..." />
                    </Form.Group>
                </Form>
            </header>
            <Navbar>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto d-flex gap-2">
                        <Link to="/books">
                            Books
                        </Link>
                        <Link to="/authors">
                            Authors
                        </Link>
                        </Nav>
                    </Navbar.Collapse>
            </Navbar>
            <div className="w-100 mb-5">
                <Link to="/authors/add">
                    <Button className="w-100" variant="success">Add Author</Button>
                </Link>
            </div>
            <ListGroup>
                {query.data?.map?.((item) => (
                    <ListGroup.Item key={item.id}>
                        <div className="d-flex justify-content-between">
                            <div>
                                <h2>{`${item.firstName} ${item.lastName}`}</h2>
                            </div>
                            <div>
                                <div className="d-flex justify-content-end" style={{ gap: "1rem"}} >
                                    <Link to={`/authors/${item.id}`}><Button variant="primary">Details</Button></Link>
                                    <Link to={`/authors/edit/${item.id}`}><Button variant="secondary">Edit</Button></Link>
                                    <Link to={`/authors/delete/${item.id}`}><Button variant="danger">Delete</Button></Link>
                                </div>
                                
                            </div>
                        </div>
                    </ListGroup.Item>
            ))}
        </ListGroup>
        </section>
    )
}

export default AuthorList;