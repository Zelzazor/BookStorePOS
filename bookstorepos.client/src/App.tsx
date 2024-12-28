import { BrowserRouter, Routes, Route } from "react-router";
import { BookDetail } from './Pages/BookDetail';
import { BookList } from './Pages/BookList';
import { QueryClient, QueryClientProvider } from "react-query";
import 'bootstrap/dist/css/bootstrap.min.css';
import { AddBook } from "./Pages/AddBook";
import { DeleteBook } from "./Pages/DeleteBook";
import { EditBook } from "./Pages/EditBook";

const queryClient = new QueryClient()

function App() {

    
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes> 
                    <Route index element={<BookList />} />
                    <Route path="books">
                        <Route index element={<BookList/>} />
                        <Route path=":id" element={<BookDetail />} />
                        <Route path="add" element={<AddBook/>} />
                        <Route path="edit/:id" element={<EditBook />} />
                        <Route path="delete/:id" element={<DeleteBook />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    )
}

export default App;