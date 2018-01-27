import React from "react";
import Jumbotron from "../../components/Jumbotron";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
//import { Input, TextArea, FormBtn } from "../../components/Form";
import SearchForm from "../../components/SearchForm";

class Articles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      beginDate: "",
      endDate: "",
      query: ""
    };
  }

  // When the component mounts, load all books and save them to this.state.books
  componentDidMount() {
    this.loadArticles();
  }

  // Loads all books  and sets them to this.state.books
  loadArticles = () => {
    API.getArticle1()
      .then(res =>
        this.setState({ articles: res.data.response.docs })
      )
      .catch(err => console.log(err));
  };

  // Deletes a book from the database with a given id, then reloads books from the db
  saveArticle = (title, date, url) => {
    API.saveArticle(title, date, url)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };

  // Handles updating component state when the user types into the input field
  handleInputChange = event => {
    // this.setState({ 
    //   query: event.target.value,
    //   beginDate: event.target.value,
    //   endDate: event.target.value });
    this.setState({ query: event.target.value });
    // const value = event.target.value;
    // const beginDate = event.target.;
    // const ed = event.target.ed;
    // if (name === "password") {
    //   value = value.substring(0, 15);
    // }
    // Updating the input's state
    // this.setState({
    //   query: value,
    //   beginDate: bd,
    //   endDate: ed
    // });
    // const { name, value } = event.target;
    // this.setState({
    //   [name]: value
    // });
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
        this.setState({ articles: res.data.response.docs, error: "" });
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
        <Row>
          <Col size="md-8">
            
              <h1>Articles Search </h1>
              <SearchForm
          handleFormSubmit={this.handleFormSubmit}
          handleInputChange={this.handleInputChange}
          handleInputChange2={this.handleInputChange2}
          handleInputChange3={this.handleInputChange3}
          />
            
            
          </Col>
          </Row>
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
                          <a href={"/articles/" + article._id}>
                        
                          {article.web_url}
                          </a>
                        </li>
                      </ul>
                      <DeleteBtn onClick={() => this.saveArticle(article.title, article.date, article.url)} />
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
