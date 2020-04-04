import React, {useState, useEffect } from 'react';
import * as BooksApi from '../BooksAPI';
import { Link } from 'react-router-dom';

const Home = () => {

    const [books , setBooks ] = useState();

    useEffect(() => {
        BooksApi.getAll()
        .then(res=>{
            console.log(res);
            setBooks(res);
        })
    }, [])

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

    if(!books) return (<h1 style={{textAlign: 'center'}}>Loading...</h1>)
    return(
        <div className="app">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-book-content">
                <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                <ol className="books-grid">
                    {
                        books.map(eachBooks=>{
                            return(
                                <li key={eachBooks.id}>
                                { eachBooks.shelf === 'currentlyReading' && (
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
                
                <h2 className="bookshelf-title">Want To Read</h2>
                <div className="bookshelf-books">
                <ol className="books-grid">
                    {
                        books.map(eachBooks=>{
                            return(
                                <li key={eachBooks.id}>
                                { eachBooks.shelf === 'wantToRead' && (
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

                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                <ol className="books-grid">
                    {
                        books.map(eachBooks=>{
                            return(
                                <li key={eachBooks.id}>
                                { eachBooks.shelf === 'read' && (
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
                </div>
            </div>
            <div className="open-search">
                <Link to={{pathname:'/search'}}>
                <button>Add a book</button>
                </Link>
            </div>
        </div>
    )
}

export default Home;