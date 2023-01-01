import React, { useState,useEffect } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props)=> {

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(true);

   // document.title = capitalizeFirstLetter(props.category);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const updateNews = async()=> {
      // props.setProgress(10);
      let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=${page}`;
      let data = await fetch(url);
      // props.setProgress(30);
      let parsedData = await data.json();
     //  props.setProgress(70);
      console.log(parsedData);
      console.log(page)
      setArticles(parsedData.articles)
      setTotalResults(parsedData.totalResults)
      setLoading(false)
     //props.setProgress(100);

  }

  useEffect(()=> {
    updateNews();
    // eslint-disable-next-line 
  }, [])


 const fetchMoreData = async () => {  

      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
      setPage(page+1)
      let data = await fetch(url);
      let parsedData = await data.json()
      setArticles(articles.concat(parsedData.articles))
      setTotalResults(parsedData.totalResults)
     
    }


 
    return (
      <>
        <h2 className='mb-2 text-center' style={{marginTop : '55px', paddingTop : '20px'}}>Top {capitalizeFirstLetter(props.category)} Headlines</h2>
       {loading && <Spinner/>}
       <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
            <div className='row'>
              {articles.map((element)=>{ 
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

News.defaultProps = {
  country: 'in',
  pageSize : 10,
  category : 'general',
  
}

News.propTypes = {
  country: PropTypes.string,
  pageSize : PropTypes.number,
  category : PropTypes.string,
  apiKey : PropTypes.string,
}

export default News
