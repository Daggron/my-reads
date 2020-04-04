import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import * as BooksApi from '../BooksAPI';
import ErrorBoundaries from './ErrorBoundaries';

export default function Search() {
    const [query,setQuery] = useState('');
    const [searchedBooks , setSearchedBooks] = useState([]);

    const handleQueryChange = (e) => {
        if(e === ''){
            setQuery('')
            setSearchedBooks([])
        }else{
            if(e==='' && query){
                return setSearchedBooks([]);
            }
            setQuery(e);
            BooksApi.search(e)
            .then(res=>{
                if(res.error){
                    setSearchedBooks([]);
                }
                else{
                    const books = res.filter(book=>book.imageLinks);
                    setSearchedBooks(books);
                }
            })
            .catch(err=>console.log(err));
        }
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
                query.length !==0 && searchedBooks.length === 0 && (
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
                                         <div className="book">
                                         <div className="book-top">
                                           <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${eachBooks.imageLinks.thumbnail})` }}></div>
                                           <div className="book-shelf-changer">
                                             <select onChange={(e)=>handleUpdate({book: eachBooks, shelf: e.target.value})}>
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
