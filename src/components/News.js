import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
    static defaultProps = {
    country: 'in',
    pageSize : 10,
    category : 'general',
    apiKey : '83a29bdfa8684778a23679c493e4641d'
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize : PropTypes.number,
    category : PropTypes.string,
    apiKey : PropTypes.string,
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
  constructor(props){
    super(props)
    console.log("News component")
    this.state = {
      articles : [],
      page : 1,
      totalResults : 0,
      loading : true
    }
    document.title = this.capitalizeFirstLetter(this.props.category);
  }
   capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  async updateNews() {
      // this.props.setProgress(10);
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}&page=${this.state.page}`;
      let data = await fetch(url);
      // this.props.setProgress(30);
      let parsedData = await data.json();
      // this.props.setProgress(70);
      console.log(parsedData);
      console.log(this.state.page)
      this.setState({
        articles: parsedData.articles,
        totalResults: parsedData.totalResults,
        loading: false, 
        page : this.state.page + 1
      
    })

    // this.props.setProgress(100);

}

async componentDidMount() {
  this.updateNews();
}

  handleNextClick = async() =>{
   this.setState({page : this.state.page + 1})
   this.updateContent();
    
  }


  handlePreviousClick = async()=>{
    this.setState({page : this.state.page - 1})
    this.updateContent();

  }

  fetchMoreData = async () => {  
  
      this.setState({page : this.state.page + 1})
      console.log(this.state.page)
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=83a29bdfa8684778a23679c493e4641d&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      let data = await fetch(url);
      let parsedData = await data.json()
      this.setState({
          articles: this.state.articles.concat(parsedData.articles),
          totalResults: parsedData.totalResults,
      })
    }


  render() {
    return (
      <>
        <h2 className='mb-4 text-center my-3'>Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h2>
       {this.state.loading && <Spinner/>}
       <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
            <div className='row'>
              {this.state.articles.map((element)=>{ 
              return  <div className='col-md-4 my-3' key={element.url}>
                          <Newsitem title = {element.title?element.title.slice(0,45):""} desciption={element.description?element.description.slice(0,50):""} imageURL={element.urlToImage} newsURL ={element.url}
                          author={element.author} date = {element.publishedAt}/>                 
                      </div>         
              })
             }
            </div>
          </div>
        </InfiniteScroll>
      
         </>
    )
  }
}

export default News
