import React,{Component} from 'react'

class BookCover extends Component{
  render(){
    const bookCover = this.props.bookCover 
  	return(
      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${bookCover})`}}></div>
    )  
  }
}

export default BookCover