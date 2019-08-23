import React, { Component } from "react";
import PostList from "./components/PostList";
import { getPosts, getUsers, getComments } from "./utils/helper";
import "./App.scss";

class App extends Component {

  constructor() {
    super();
    this.state = {
      query: '',
      sortField: '',
      posts: [],
      visiblePosts: [],
      completeLoad: false
    };
  }

  getData = async () => {
    const [posts, users, comments] = await Promise.all([
      getPosts(),
      getUsers(),
      getComments()
    ]);

    const updatePosts = posts.map(post => ({
      ...post,
      user: users.find((user) => user["id"] === post["userId"]),
      commentsPost: comments.filter(commentsPost=>commentsPost['postId']===post['id'])
    }));

    this.setState(prevState=>({
      ...prevState,
      posts: updatePosts,
      visiblePosts: updatePosts,
      completeLoad: !prevState.completeLoad,
      }));

  };

  preparePosts = () => {
     const { posts,  sortField, query} = this.state;
     const searchText = query.toLowerCase();

     const filteredPosts = posts.filter(post =>
       post["title"].toLowerCase().includes(searchText));

     const callbackMap = {
       'id': (a, b) => (a.id - b.id),
       'title': (a, b) => a.title.localeCompare(b.title),
       'user': (a, b) => a.user.name.localeCompare(b.user.name),
     };
     return { visiblePosts: [...filteredPosts].sort(callbackMap[sortField]) }
  };

  sort = (event)=>{
    this.setState(
      {sortField: event.target.value,} ,
      ()=>this.setState(this.preparePosts)
      );

  };

  filter = (event) => {
    this.setState({query: event.target.value },
      ()=>this.setState(this.preparePosts)
    );
  };

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1>Dynamic List Of Posts</h1>
        </header>
        <div className={"App-nav"}>
          {!this.state.completeLoad ? <button
              className={"btn-load"}
              onClick={this.getData}
            >{!this.state.isLoading ? "Load" : "Loading..."}
            </button> :
            <>
              <select onChange={this.sort}>
                <option value="id">Sorted By Id</option>
                <option value="title">Sorted By Text</option>
                <option value="user">Sorted By User Name</option>
              </select>

              <input className={"search"}
                     type={"text"}
                     onChange={this.filter}
              />
            </>
          }
        </div>
        <main>
          <PostList
            posts={this.state.visiblePosts}
          />
        </main>
      </div>
    );
  }
}

export default App;
