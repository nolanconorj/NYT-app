import axios from "axios";



const baseUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key="
const apiKey = "7385cc61de994eb69461da97038cc32a"
// const beginDate = "20180101"
// const endDate = "20180125"
// const query = "nba"

export default {
  //API call to NYT
  getArticle1: function(query, beginDate, endDate) {
    return axios.get(baseUrl + apiKey + "&q=" + query + "&begin_date=" + beginDate + "&end_date=" + endDate);
      // "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=7385cc61de994eb69461da97038cc32a&q=cats&begin_date=20180101&end_date=20180125");
  },
  // Gets all articles
  getArticles: function () {
    return axios.get("/api/articles");
  },
  // Saves an article to the database
  saveArticle: function (articleData) {
    return axios.post("/api/articles", articleData);
  },
  // Deletes the article with the given id
  deleteArticle: function (id) {
    return axios.delete("/api/articles/" + id);
  }
};
