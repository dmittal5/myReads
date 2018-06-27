import React,{Component} from 'react'
import PropTypes from 'prop-types'

class Authors extends Component{
	render(){
      const authors = this.props.authors
      return(
        <div className="book-authors">
        	{
        		authors.map((author)=>(
        			<div key={author}>{author}</div>
      		))}
        </div>
      )
    }
}

Authors.propTypes={
	authors : PropTypes.array.isRequired
}

export default Authors