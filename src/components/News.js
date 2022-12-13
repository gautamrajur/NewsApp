import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'

export class News extends Component {
    static defaultProps = {
    country: 'in',
    pageSize : 12,
    category : 'general'
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize : PropTypes.number,
    category : PropTypes.string
  }

  articles = [
    {
      "source": {
        "id": "espn-cric-info",
        "name": "ESPN Cric Info"
      },
      "author": null,
      "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
      "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
      "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
      "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
      "publishedAt": "2020-04-27T11:41:47Z",
      "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
    },
    {
      "source": {
        "id": "espn-cric-info",
        "name": "ESPN Cric Info"
      },
      "author": null,
      "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
      "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
      "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
      "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
      "publishedAt": "2020-03-30T15:26:05Z",
      "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
    }
  ]
  constructor(){
    super()
    console.log("News component")
    this.state = {
      // articles : this.articles,
      articles : undefined,
      loading : false,
      page : 1,
    }
  }

  async updateContent() {
    if(!(this.state.page + 1 > Math.ceil(this.state.totalArticles/this.props.pageSize))){
      console.log("Next")
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=83a29bdfa8684778a23679c493e4641d&pageSize=${this.props.pageSize}&page=${this.state.page}`;
      this.setState({loading : true})
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);
      this.setState({
      articles : parsedData.articles, 
      loading : false
    })
  }
}

 async componentDidMount(){
    this.updateContent();
  }
  handleNextClick = async() =>{
   this.setState({page : this.state.page + 1})
   this.updateContent();
    
  }


  handlePreviousClick = async()=>{
    this.setState({page : this.state.page - 1})
    this.updateContent();

  }



  render() {
    console.log("render")
    return (
      <>
      <div className='container my-3'>
        <h2 className='mb-4 text-center' style={{margin : '35 px', marginTop : '30 px'}}>What's Hot? India</h2>
       {this.state.loading && <Spinner/>} 
        <div className='row'>
          {!this.state.loading && this.state.articles && this.state.articles.map((element)=>{ 
          return  <div className='col-md-4 my-3' key={element.url}>
                      <Newsitem title = {element.title?element.title.slice(0,45):""} desciption={element.description?element.description.slice(0,50):""} imageURL={element.urlToImage} newsURL ={element.url}
                      author={element.author} date = {element.publishedAt}/>                 
                  </div>
                 
         })}
          </div>
       </div>
       <div className="container d-flex justify-content-between">
           <button disabled = {this.state.page <=1} type="button" className="btn btn-dark mb-3" onClick={this.handlePreviousClick}>&laquo; Previous</button>
           <button disabled = {this.state.page + 1 > Math.ceil(this.state.totalArticles/this.props.pageSize)} type="button" className="btn btn-dark mb-3" onClick={this.handleNextClick}>Next &raquo;</button>
        </div>
         </>
    )
  }
}

export default News
