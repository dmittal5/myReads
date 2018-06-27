import React,{Component} from 'react'
import PropTypes from 'prop-types'
import Book from './Book.js'

class BookShelf extends Component{
	render(){
      	const {bookShelf, bookList, updateBookSelection} = this.props
    	return(
        	<div className="bookshelf">
                <h2 className="bookshelf-title">{bookShelf.title}</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                      {	
                          	bookList
                              .filter(book=>book.shelf===bookShelf.value)
                              .map(book=>(
                                  <li key={book.id}>
                                  <Book book={book} updateBookSelection={updateBookSelection}/>
                                  </li>
                              ))
                      }     
                  </ol>
                </div>
              </div>
          )
    }
}

BookShelf.propTypes={
	bookShelf: PropTypes.object.isRequired,
  	bookList: PropTypes.array.isRequired
}

export default BookShelf