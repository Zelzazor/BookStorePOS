/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import { useParams } from "react-router"
import { getBook } from "../../Api/Books";
import { useQuery } from "react-query";
import { Button } from "react-bootstrap";
import { Link } from "react-router";
import { Author } from "../../Model/Book";
import { Loading } from "../../Components/Loading";

const BookDetail = () => {
    const params = useParams();

    const query = useQuery<Author, Error>(["book", params.id], async () => await getBook(params.id ?? ''))
    
    if (query.isLoading) {
        return <Loading />
    }

    if (query.isError) {
        return (
            <div style={{ display: "flex", flexDirection:'column', placeItems: 'center', justifyContent: 'center', minHeight: "100vh" }}>
                <h4>{query.error.message}</h4>
                <Link to="/books">Return to list</Link>
            </div>
        )
    }

    

    const item = query.data;

    return (
        <div className="p-5">
            <Link to="/books">Return to list</Link>
            <div className="d-flex justify-content-between mt-3">
                <div>
                    <h2>{item?.title}</h2>
                    <p>{item?.description}</p>
                </div>
                <div>
                    <p>Publish date: {(new Date(item?.publishDate!)).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <p>Page Count: {item?.pageCount}</p>

                </div>

            </div>
            <p><em>{item?.excerpt}</em></p>
            <div className="d-flex" style={{ gap:"1rem" } }>
                <Link to={`/books/edit/${item?.id}`}><Button variant="secondary">Edit</Button></Link>
                <Link to={`/books/delete/${item?.id}`}><Button variant="danger">Delete</Button></Link>
            </div>
        </div>
       
    )
}

export default BookDetail;