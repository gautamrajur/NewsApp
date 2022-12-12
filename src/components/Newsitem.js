import React, { Component } from 'react'

export class Newsitem extends Component {
  render() {

    let {title , desciption, imageURL, newsURL, author, date} = this.props;


    return (
      <div>
       <div className="card" style={{backgroundColor: 'lightgrey'}}>
         <img src={!imageURL?"https://cdn.mos.cms.futurecdn.net/3wxfAYPFnFvomxBiJNgN9U-1200-80.jpg":imageURL} className="card-img-top" alt="..."/>
         <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{desciption}...</p>
            <p className="card-text"><small className="text-muted">Author : {!author ?'unknown' : author} on {new Date(date).toGMTString()}</small></p>
            <a href={newsURL} target="_blank" rel='noreferrer' className="btn btn-sm btn-primary">Read more</a>
         </div>
      </div>
      </div>
    )
  }
}

export default Newsitem
