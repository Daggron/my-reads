import React from 'react';
import * as BooksApi from '../BooksAPI';

const BooksList = (props) => {

    const {books , setBooks , shelf } = props;
    const handleUpdate = (data) => {
        const {book , shelf} = data;
        const newarr = books.map(eachbook=>{
            if(eachbook.id === book.id){
                eachbook.shelf = shelf;
            }
            return eachbook;
        })
        setBooks(newarr);
        BooksApi.update(book,shelf)
        .then(res=>console.log(res))
        .catch(err=>console.log(err));
    }

    return(
        <div className="bookshelf-books">
            <ol className="books-grid">
                    {
                        books.map(eachBooks=>{
                            return(
                                <li key={eachBooks.id}>
                                { eachBooks.shelf === shelf && (
                                     <div className="book">
                                     <div className="book-top">
                                       <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${eachBooks.imageLinks.thumbnail})` }}></div>
                                       <div className="book-shelf-changer">
                                         <select onChange={(e)=>handleUpdate({book: eachBooks, shelf: e.target.value})} defaultValue={eachBooks.shelf}>
                                           <option value="move" disabled>Move to...</option>
                                           <option value="currentlyReading">Currently Reading</option>
                                           <option value="wantToRead">Want to Read</option>
                                           <option value="read">Read</option>
                                           <option value="none">None</option>
                                         </select>
                                       </div>
                                     </div>
                                     <div className="book-title">{eachBooks.title}</div>
                                     <div className="book-authors">{eachBooks.authors}</div>
                                   </div>
                                ) }
                                </li>
                            )
                        })
                    }
                </ol>
                </div>
    )
}

export default BooksList;