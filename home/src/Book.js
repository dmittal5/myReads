import React,{Component} from 'react'
import ShelfChangerOptions from './ShelfChangerOptions.js'
import BookCover from './BookCover.js'
import Authors from './Authors.js'
import PropTypes from 'prop-types'

class Book extends Component{
  
  handleSelectionChanged =(selection)=>{
  	this.props.updateBookSelection(this.props.book, selection)
  }
  
  render(){
    const {book} = this.props
    
    return(
      <div className="book">
        <div className="book-top">
      {book.imageLinks &&
          	<BookCover bookCover={book.imageLinks.thumbnail}/>}
            <ShelfChangerOptions selectedState={book.shelf} handleSelectionChanged={this.handleSelectionChanged}/>
        </div>
        <div className="book-title">{book.title}</div>
        
      	<div className="book-authors">
        	{	
      			book.authors && 
        		(<Authors authors={book.authors}/>)
      		}
        </div>
      </div>	
    )
  }
}

Book.propTypes = {
	book: PropTypes.object.isRequired
}

export default Book