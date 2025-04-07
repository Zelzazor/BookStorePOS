import { useParams } from "react-router"
import { useQuery } from "react-query";
import { Button } from "react-bootstrap";
import { Link } from "react-router";
import { getAuthor } from "../../Api/Authors";
import { Author } from "../../Model/Author";
import { Loading } from "../../Components/Loading";

const AuthorDetail = () => {
    const params = useParams();

    const query = useQuery<Author, Error>(["author", params.id], async () => await getAuthor(params.id ?? ''))

    if (query.isLoading) {
        return <Loading />
    }

    if (!query.data || query.isError) {
        return (
            <div style={{ display: "flex", flexDirection: 'column', placeItems: 'center', justifyContent: 'center', minHeight: "100vh" }}>
                <h4>{query?.error?.message ?? 'Author was not found'}</h4>
                <Link to="/books">Return to list</Link>
            </div>
        )
    }



    const item = query.data;

    return (
        <div className="p-5">
            <Link to="/authors">Return to list</Link>
            <div className="d-flex justify-content-between mt-3">
                <div>
                    <h2>{`${item?.firstName} ${item?.lastName}`}</h2>
                    <p>Book: <Link to={`/books/${item?.idBook}`}>{`${item?.book?.title}`}</Link></p>
                </div>
            </div>
            <div className="d-flex" style={{ gap: "1rem" }}>
                <Link to={`/authors/edit/${item?.id}`}><Button variant="secondary">Edit</Button></Link>
                <Link to={`/authors/delete/${item?.id}`}><Button variant="danger">Delete</Button></Link>
            </div>
        </div>

    )
}

export default AuthorDetail;