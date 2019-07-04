import React, { Component } from "react";
import PostList from "./components/PostList";
import { getPosts, getUsers, getComments } from "./utils/helper";
import "./App.css";

function sortByName() {
  return (a, b) => a["userName"].localeCompare(b["userName"]);
}

function sortByTitle() {
  return (a, b) => a["title"].localeCompare(b["title"]);
}

function sortById() {
  return (a, b) => a["id"] - b["id"];
}

class App extends Component {

  constructor() {
    super();
    this.state = {
      posts: [],
      users: [],
      comments: [],
      sortedPosts: [],
      filteredPosts: [],
      sort: false,
      filter:false,
      isLoading: false,
      completeLoad: false
    };
  }

  getData = async () => {
    const [posts, users, comments] = await Promise.all([
      getPosts(),
      getUsers(),
      getComments()
    ]);

    this.setState({ isLoading: true });

    setTimeout(() => {
      this.setState({
        posts: posts,
        users: users,
        comments: comments,
        completeLoad: true,
      });
    }, 1000);
  };

  sort = (event) => {
    const {posts, users} = this.state;
    const updatePosts = posts.map((post) => {
         const user = users.find((user) => user["id"] === post["userId"]),
         copyPost = { ...post };
         copyPost["userName"] = user["name"];
         return copyPost;
       });

    const sortItemsMap = {
      "id": sortById(),
      "name": sortByName(),
      "title": sortByTitle()
    };
    const sortedPosts = updatePosts.sort(sortItemsMap[event.target.value]);

    this.setState({ sortedPosts: sortedPosts,
                    sort:true,
                    filter:false,
    });
  };

  filter = (event) => {
    const searchText = event.target.value.toLowerCase();
    const filteredPosts = this.state.sortedPosts.filter(post =>
      post["title"].toLowerCase().includes(searchText));
    this.setState({
      filteredPosts: filteredPosts,
      sort:false,
      filter:true,
    });
  };

  render() {
    let visiblePosts;
    const {sortedPosts, filteredPosts, posts , sort, filter} = this.state;

    visiblePosts = posts;

    if(sort){
       visiblePosts = sortedPosts;
    }
    if (filter){
       visiblePosts = filteredPosts;
    }

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
                <option value="name">Sorted By User Name</option>
                <option value="title">Sorted By Text</option>
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
            posts={visiblePosts}
            users={this.state.users}
            comments={this.state.comments}
          />
        </main>
      </div>
    );
  }
}

export default App;
