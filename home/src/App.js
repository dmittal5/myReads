import React from 'react'
import {Link, Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf.js'
import Book from './Book.js'

class BooksApp extends React.Component {
  
  //initialization
  constructor(props){
  	super(props)
    this.state = {
       bookList:[],
       searchedBooks:[],
       query:"",
      /**
       * TODO: Instead of using this state variable to keep track of which page
       * we're on, use the URL in the browser's address bar. This will ensure that
       * users can use the browser's back and forward buttons to navigate between
       * pages, as well as provide a good URL they can bookmark and share.
       */
    }
  }
  
  //calling fetch all books api before rendering the page
  componentDidMount(){
     BooksAPI.getAll()
       .then((books) =>{
        this.setState((prevState)=>({
          bookList:books
        }))
      })
  }
  
  //search book api
  searchBook=(query, maxResults)=>{
    if(query === ""){
    this.setState({searchedBooks:[]})
    }
    else{
    console.log(query,' query in searchBook')
    const searchQuery = query.trim()
  	BooksAPI.search(searchQuery, maxResults)
    	.then((results)=>{
        let items = results.hasOwnProperty("items")? [] : results
        items = items.filter(item=>{
          const bookIndex = this.state.bookList.findIndex(book=>book.id===item.id)
          return bookIndex===-1?true:false
        })
    	this.setState({
    		searchedBooks: items
    	}, () => {
     console.log(query,' updated state value ', this.state.searchedBooks)
        })})
          .catch((err)=>{
     		console.log("error in search book",err)
     	})
    }
  }
  
  //update query
  updateQuery = (query)=>{
    console.log(query,' query in updateQuery')
  	this.setState(()=>({
    	query: query
    }), ()=>{this.searchBook(this.state.query, 20)})
  }
  
  getUpdatedBooks = (book, shelf, books, index)=>{
    console.log("in getUpdatedBooks")
    if(index === -1){	//book is not from book shelf and is from search results
          BooksAPI.get(book.id)
            .then((bookSelected)=>{
            	//adding selected book from search results to book shelf
            	books.push(bookSelected)
            	//removing the selected book from search results
            	const selectedBookIndex = this.state.searchedBooks.findIndex(item=>item.id===book.id)
                let searchResults = this.state.searchedBooks
                searchResults.splice(selectedBookIndex,1)
            	console.log("searchReults: ",searchResults)
            	this.setState(()=>({
                	searchedBooks: searchResults
                }),console.log("selectedBookIndex",selectedBookIndex))
          	})
        }
    	else{	//book belongs to one of the book shelf
			books[index].shelf = shelf
        }
     var promise = new Promise(function(resolve, reject) {    
        resolve(books)
     });   
     return promise;   
  }

  updateBookSelection = (book, shelf)=>{
    	BooksAPI.update(book, shelf)
      	let books = Object.assign(this.state.bookList);
      	const index = books.findIndex(b=>b.id === book.id)
        this.getUpdatedBooks(book, shelf, books, index)
          .then((books)=>{
          	console.log("handleSelectionChanged",books)
        	this.setState({
        		bookList:books
        	})
        })
    }

  render() {
    const bookShelf = [ {value: 'currentlyReading', title: 'Currently Reading'},
      					{value: 'wantToRead', title: 'Want To Read'},
      					{value: 'read', title: 'Read'}]
    return (
      <div className="app">
        <Route exact path='/search' render={()=>(
    		<div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to='/'>Close</Link>
                <div className="search-books-input-wrapper">
                {
                  /*NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */
                }
                <input 
					type="text" 
					placeholder="Search by title or author" 
					value={this.state.query} 
					onChange={event=>{this.updateQuery(event.target.value)}}
                />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
				{		
                  	this.state.searchedBooks.map((book)=>(
               		<li key={book.id}><Book book={book} updateBookSelection={this.updateBookSelection}/></li>
               	))}
			  </ol>
            </div>
          </div>
    	)} />  
      	<Route exact path='/' render={()=>(
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                  {
          		     bookShelf.map((shelf)=>(
                      	<BookShelf key={shelf.title} bookShelf={shelf} bookList={this.state.bookList} 											updateBookSelection={this.updateBookSelection}/>
                  	  )
				  )}
              </div>
            </div>
            <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp