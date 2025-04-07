import { BrowserRouter, Routes, Route } from "react-router";
import { QueryClient, QueryClientProvider } from "react-query";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Suspense } from "react";
import { Loading } from "./Components/Loading";

const BookPages = {
    BookList: React.lazy(() => import('./Pages/Books/BookList')),
    BookDetail: React.lazy(() => import('./Pages/Books/BookDetail')),
    AddBook: React.lazy(() => import('./Pages/Books/AddBook')),
    DeleteBook: React.lazy(() => import('./Pages/Books/DeleteBook')),
    EditBook: React.lazy(() => import('./Pages/Books/EditBook'))
}

const AuthorPages = {
    AuthorList: React.lazy(() => import('./Pages/Authors/AuthorList')),
    AuthorDetail: React.lazy(() => import('./Pages/Authors/AuthorDetail')),
    AddAuthor: React.lazy(() => import('./Pages/Authors/AddAuthor')),
    EditAuthor: React.lazy(() => import('./Pages/Authors/EditAuthor')),
    DeleteAuthor: React.lazy(() => import('./Pages/Authors/DeleteAuthor'))
}


const queryClient = new QueryClient()

function App() {

    
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Suspense fallback={<Loading />} >
                    <Routes>
                        <Route index element={<BookPages.BookList />} />
                        <Route path="books">
                            <Route index element={<BookPages.BookList />} />
                            <Route path=":id" element={<BookPages.BookDetail />} />
                            <Route path="add" element={<BookPages.AddBook />} />
                            <Route path="edit/:id" element={<BookPages.EditBook />} />
                            <Route path="delete/:id" element={<BookPages.DeleteBook />} />
                        </Route>
                        <Route path="authors">
                            <Route index element={<AuthorPages.AuthorList />} />
                            <Route path=":id" element={<AuthorPages.AuthorDetail />} />
                            <Route path="add" element={<AuthorPages.AddAuthor />} />
                            <Route path="edit/:id" element={<AuthorPages.EditAuthor />} />
                            <Route path="delete/:id" element={<AuthorPages.DeleteAuthor />} />
                        </Route>
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </QueryClientProvider>
    )
}

export default App;