import React from 'react';
import * as BooksApi from '../BooksAPI';
import Book from './Book';

const BooksList = (props) => {

    const {books , setBooks , allBooks  } = props;


    const handleUpdate = (data) => {
        const {book , shelf} = data;
        const newarr = allBooks.map(eachbook=>{
            if(eachbook.id === book.id){
                eachbook.shelf = shelf;
            }
            return eachbook;
        })
        setBooks(newarr);
        BooksApi.update(book,shelf)
        .then(res=>alert(`${book.title} has been added to ${shelf} successfully`))
        .catch(err=>{
            alert(`An Error Occurred while adding the book to ${shelf}`)
            console.log(err);
        });
    }

    return(
        <div className="bookshelf-books">
            <ol className="books-grid">
                    {
                        books.map(eachBooks=>{
                            return(
                                <li key={eachBooks.id}>
                                    <Book eachBooks={eachBooks} handleUpdate={handleUpdate} />
                                </li>
                            )
                        })
                    }
                </ol>
                </div>
    )
}

export default BooksList;