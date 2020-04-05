import React from 'react'

export default function Book(props) {
    const {eachBooks, handleUpdate } = props;

    return (
        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${eachBooks.imageLinks.thumbnail})` }}></div>
                <div className="book-shelf-changer">
                    <select onChange={(e)=>handleUpdate({book: eachBooks, shelf: e.target.value})} defaultValue={eachBooks.shelf ? eachBooks.shelf : 'none'}>
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
    )
}
