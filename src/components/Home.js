import React, {useState, useEffect } from 'react';
import * as BooksApi from '../BooksAPI';
import { Link } from 'react-router-dom';
import BooksList from './BooksList';
import ErrorBoundaries from './ErrorBoundaries';
import Loading from './Loading';

const Home = () => {

    const [books , setBooks ] = useState();

    useEffect(() => {
        BooksApi.getAll()
        .then(res=>{
            setBooks(res);
        })
    }, [])

   

    if(!books) return <Loading />

    return(
        <ErrorBoundaries>
            <div className="app">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-book-content">
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Currently Reading</h2>
                        <BooksList books={books} setBooks={setBooks} shelf='currentlyReading'/>

                        <h2 className="bookshelf-title">Want To Read</h2>
                        <BooksList books={books} setBooks={setBooks} shelf='wantToRead'/>

                        <h2 className="bookshelf-title">Read</h2>
                        <BooksList books={books} setBooks={setBooks} shelf='read'/>
                    </div>
                </div>
                <div className="open-search">
                    <Link to={{pathname:'/search'}}>
                    <button>Add a book</button>
                    </Link>
                </div>
            </div>
        </ErrorBoundaries>
    )
}

export default Home;