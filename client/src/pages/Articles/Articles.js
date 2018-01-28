import React from "react";
import Jumbotron from "../../components/Jumbotron";
import SearchJumbotron from "../../components/SearchJumbotron";
import SaveBtn from "../../components/SaveBtn";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import { Col, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
//import { Input, TextArea, FormBtn } from "../../components/Form";
import SearchForm from "../../components/SearchForm";


class Articles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      savedArticles: [],
      beginDate: "",
      endDate: "",
      query: ""
    };
    
  }

  // When the component mounts, load all books and save them to this.state.books
  componentDidMount() {
    this.loadArticles();
    this.loadSavedArticles();
  }

  // Loads all books  and sets them to this.state.books
  loadArticles = () => {
    API.getArticle1()
    .then(res =>
      this.setState({ articles: res.data.response.docs})
    )
    .catch(err => console.log(err));
  };

  loadSavedArticles = () => {
    API.getArticles()
    .then(res =>
      this.setState({ savedArticles: res.data},
        console.log(res.data))
    )
    .catch(err => console.log(err));
  };
  
  

  // Saves a book from the database with a given id, then reloads books from the db
  saveArticle = (snippet, date, url) => {
    API.saveArticle({
      title: snippet, 
      date: date, 
      url: url
    })
      .then(res => this.loadSavedArticles(), console.log(snippet), console.log(date), console.log(url)
    )
 
  
      .catch(err => console.log(err));
  };

  deleteArticle = id => {
    API.deleteArticle(id)
      .then(res => this.loadSavedArticles())
      .catch(err => console.log(err));
  };

  // Handles updating component state when the user types into the input field
  handleInputChange = event => {
    // this.setState({ 
    
    this.setState({ query: event.target.value });
   
  };
  handleInputChange2 = event => {
    
    this.setState({ beginDate: event.target.value });

  };
  handleInputChange3 = event => {
    
    this.setState({ endDate: event.target.value });

  };
  

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  handleFormSubmit = event => {
    event.preventDefault();
    API.getArticle1(this.state.query, this.state.beginDate, this.state.endDate)
      .then(res => {
        if (res.data.status === "error") {
          throw new Error(res.data.message);
        }
        this.setState({ articles: res.data.response.docs, error: "" })
      }) 
      .catch(err => this.setState({ error: err.message }));
    // event.preventDefault();
    // if (this.state.title && this.state.date) {
    //   API.saveArticle({
    //     title: this.state.title,
    //     date: this.state.date,
    //     url: this.state.url
    //   })
    //     .then(res => this.loadArticles())
    //     .catch(err => console.log(err));
    // }
    
  };

  render() {
    return (
      <div>
      <Container fluid>
      <Col size="md-8">
      <SearchJumbotron>
        
          
            
              <h1>Articles Search </h1>
              <SearchForm
          handleFormSubmit={this.handleFormSubmit}
          handleInputChange={this.handleInputChange}
          handleInputChange2={this.handleInputChange2}
          handleInputChange3={this.handleInputChange3}
          />
            
            
          
          
          </SearchJumbotron>
          </Col>
      </Container>
      
      <Container fluid>    
          <Col size="md-8">
            
            
            <Jumbotron>
              <h1>Articles Results</h1>
          
            {this.state.articles.length ? (
              <List>
                {this.state.articles.map(article => {
                  return (
                    <ListItem key={article._id}>
                      <ul>
                        <li>{article.snippet}
                         <p></p>
                          <a href={article.web_url}>
                        
                          {article.web_url}
                          </a>
                        </li>
                      </ul>
                      <SaveBtn onClick={() => this.saveArticle(article.snippet, article.pub_date, article.web_url)} />
                      
                    </ListItem>
                  );
                })}
              </List>
            ) : (
                <h3>No Results to Display</h3>
              )}
               </Jumbotron>
          </Col>
          
        </Container>

        <Container fluid>
            <Col size="md-8">
            <Jumbotron>
              
                
              <h1>
                Saved Articles
                </h1>

               {this.state.savedArticles.length ? (
              <List>
                {this.state.savedArticles.map(article => {
                  return (
                    <ListItem key={article._id}>
                      <ul>
                        <li>{article.title}
                         <p></p>
                          <a href={article.web_url}>
                        
                          {article.url}
                          </a>
                        </li>
                      </ul>
                      <DeleteBtn onClick={() => this.deleteArticle(article._id)} />
                    </ListItem>
                  );
                })}
              </List>
            ) : (
                <h3>No Results to Display</h3>
              )}
             
            
                
            </Jumbotron>
            </Col>
          </Container>

        
      </div>
        
    );
  }
}

export default Articles;
