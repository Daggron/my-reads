import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import * as BooksApi from '../BooksAPI';
import ErrorBoundaries from './ErrorBoundaries';
import Book from './Book';

export default function Search(props) {
    const [query,setQuery] = useState('');
    const [searchedBooks , setSearchedBooks] = useState([]);
    const [fetched , setFetched ] = useState(false);

    const {allBooks} = props.location.state;

    const handleQueryChange = async (e) => {
            if(e===''){
                setQuery('')
                setSearchedBooks([]);
            }
            setFetched(false);
            if(e==='' && query){
                return setSearchedBooks([]);
            }
            setQuery(e);
            BooksApi.search(e)
            .then(res=>{
                if(res.error){
                    setSearchedBooks([]);
                    setFetched(true);
                }
                else{
                    const books = res.filter(book=>book.imageLinks);
                    for(let e in books){
                        for (let b in allBooks){
                            if(allBooks[b].id===books[e].id){
                                books[e].shelf = allBooks[b].shelf;
                            }
                        }
                    }
                    setSearchedBooks(books);
                    setFetched(true);
                    // console.log(books);
                }
            })
            .catch(err=>console.log(err));
            
    }

    const handleUpdate = (data) => {
        const {book , shelf} = data;
        BooksApi.update(book,shelf)
        .then(res=>alert(`${book.title} has been added to the ${shelf} successfully`))
        .catch(err=>console.log(err));
    }

    return (
        <ErrorBoundaries>
        <div>
            {
                query.length !==0 && fetched && searchedBooks.length === 0 && (
                    <div className="notfound">
                        Can't Find Any book related to <span className="links">{ query }</span>. <p className="links" onClick={()=>setQuery('')}>Clear Search</p>
                    </div>
                )
            }
            <div className="search-books">
            <div className="search-books-bar">
                <Link to={{pathname:'/'}}>
                    <button className="close-search">Close</button>
                </Link>
                <div className="search-books-input-wrapper">
                <input type="text" onChange={(e)=>handleQueryChange(e.target.value)} placeholder="Search by title or author" value={query}/>

                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {
                        searchedBooks.length !==0 && (
                            searchedBooks.map(eachBooks=>{
                                return(
                                    <li key={eachBooks.id}>
                                        <Book eachBooks={eachBooks} handleUpdate={handleUpdate} />
                                    </li>
                                )
                            })
                        )
                    }
                </ol>
            </div>
            </div>
        </div>
        </ErrorBoundaries>
    )
}
