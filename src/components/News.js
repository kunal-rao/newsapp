import React, {useEffect, useState} from "react";
import NewsItems from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


const News= (props)=> {
 const [articles, setArticles] = useState([]);
 const [loading, setLoading] = useState(true);
 const [page, setPage] = useState(1);
 const [totalResults, setTotalResults] = useState(0);
//  document.title = `${this.capitilizeFirstLetter(props.category)} - NewsMonkey`
 
 const capitilizeFirstLetter=(string)=>{
return string.charAt(0).toUpperCase() + string.slice(1);

  }

  const updateNews = async() =>{
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=3f74eb4f14cd47bc9e3ca1d196b0ebaf&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setArticles(parsedData.articles);
    setLoading(false);
    setTotalResults(parsedData.totalResults);
  }
  
  // async componentDidMount() {
  //   // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=3f74eb4f14cd47bc9e3ca1d196b0ebaf&page=1&pageSize=${props.pageSize}`;
  //   // this.setState({loading: true});
  //   // let data = await fetch(url);
  //   // let parsedData = await data.json();
  //   // console.log(parsedData);
  //   // setArticles(parsedData.articles);
  //   // setLoading(false);
  //   // setTotalResults(parsedData.totalResults);

  // }
  useEffect(() => {
    updateNews()
  }, [])
  
  const handlePrevClick = async () => {
    
    setPage(page -1);
    updateNews();
    
  };
  const handleNextClick = async () => {
    // if (
    //   !(this.state.page + 1 >
    //   Math.ceil(this.state.totalResults / props.pageSize)) 
    // ) {
   
    setPage(page  + 1);
    updateNews();
  };
  const fetchMoreData = async() => {
    setPage(page + 1)
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=3f74eb4f14cd47bc9e3ca1d196b0ebaf&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  }
    return (
      <>
        <h1 className="text-center"  style={{margin: '40px 0px'}}>News Monkey Top headlines from - {capitilizeFirstLetter(props.category)}</h1>
        {/* {this.state.loading && <Spinner />} */}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
        <div className="row">
          {articles.map((element) => {
            return (
              <div className="col-md-4 " key={element.url}>
                <NewsItems
                  title={element.title ? element.title : ""}
                  description={
                    element.description ? element.description.slice(0, 150) : ""
                  }
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
              
            );
          })}
        </div>
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            {" "}
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;{" "}
          </button>
        </div> */}
      </>
    );
  
}
News.defaultProps = {
  country : 'in',
  pageSize : 8,
  category: 'general',
} 
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number, 
  category: PropTypes.string,
}

export default News
