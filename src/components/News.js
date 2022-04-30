import React, { Component } from "react";
import NewsItems from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


export default class News extends Component {

  static defaultProps = {
    country : 'in',
    pageSize : 8,
    category: 'general',
  } 
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number, 
    category: PropTypes.string,
  }
  capitilizeFirstLetter=(string)=>{
return string.charAt(0).toUpperCase() + string.slice(1);

  }

  constructor(props) {
    super(props);
    console.log("this is a constructor from newsitems");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.capitilizeFirstLetter(this.props.category)} - NewsMonkey`
  }
  

  
  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3f74eb4f14cd47bc9e3ca1d196b0ebaf&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    
  }
  handlePrevClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3f74eb4f14cd47bc9e3ca1d196b0ebaf&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;

    this.setState({
      loading: true,
    });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false,
    });
    
  };
  handleNextClick = async () => {
    if (
      !(this.state.page + 1 >
      Math.ceil(this.state.totalResults / this.props.pageSize)) 
    ) {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3f74eb4f14cd47bc9e3ca1d196b0ebaf&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      this.setState({
        loading: true,
      });
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading: false,
      });
     
    }
  };
  fetchMoreData = async() => {
    this.setState({page: this.state.page + 1})
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3f74eb4f14cd47bc9e3ca1d196b0ebaf&page=${this.state.page}&pageSize=${this.props.pageSize}`;

    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }
  render() {
    return (
      <>
        <h1 className="text-center"  style={{margin: '40px 0px'}}>News Monkey Top headlines from - {this.capitilizeFirstLetter(this.props.category)}</h1>
        {/* {this.state.loading && <Spinner />} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
        <div className="row">
          {this.state.articles.map((element) => {
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
              Math.ceil(this.state.totalResults / this.props.pageSize)
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
}
