import React from "react";
// import { Link } from "react-router-dom";
import { Col, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { List, ListItem } from "../../components/List";



class Saved extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      savedArticles: []
     
      
    };
    

  }

  componentDidMount() {
    this.loadSavedArticles();
  }

  // Loads all saved books  and sets them to this.state.books
  loadSavedArticles = () => {
    API.getArticles()
      .then(res =>
        this.setState({ savedArticles: res.data})
      )
      .catch(err => console.log(err));
  };

  // Deletes a book from the database with a given id, then reloads books from the db
  saveArticle = (id) => {
    API.saveArticle({
      title: this.state.title,
      date: this.state.date,
      url: this.state.url
    })
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };

  

 
  // When this component mounts, grab the book with the _id of this.props.match.params.id
  // e.g. localhost:3000/books/599dcb67f0f16317844583fc
  
  // componentDidMount() {
  //   API.getArticle1()
    
  //     .then(res => {
  //       console.log(res.data.response.docs) 
  //       this.setState({ article: res.data.response.docs[0].snippet })
      
  //     })
      
  //     .catch(err => console.log(err));
      
      
  // }

  renderArticle(){

  }

  render() {
    //const { results } = this.props
    return (
      
    
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
                          <a href={"/articles/" + article._id}>
                        
                          {article.url}
                          </a>
                        </li>
                      </ul>
                      {/* <DeleteBtn onClick={() => this.saveArticle(article.title, article.date, article.url)} /> */}
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
          
        
      
         
            
          
        
     
      
    );
  }
}



export default Saved;
