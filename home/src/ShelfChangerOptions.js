import React,{Component} from 'react'

class ShelfChangerOptions extends Component{
  render(){
    const {selectedState, handleSelectionChanged} = this.props
    const selectedOption = selectedState === undefined? "none": selectedState
    return(
      <div className="book-shelf-changer">
        <select name="shelf" value={selectedOption} onChange={event=>{handleSelectionChanged(event.target.value)}}>
            <option value="null" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
         </select>
      </div>
    )
  }
}

export default ShelfChangerOptions