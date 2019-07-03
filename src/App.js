import React, { Component } from "react";
import PostList from "./components/PostList";
import { getPosts, getUsers, getComments } from "./utils/helper";
import "./App.css";

function sortByName(posts, users) {
  return posts.map((post) => {
    const user = users.find((user) => user["id"] === post["userId"]),
      copyPost = { ...post };
    copyPost["userName"] = user["name"];
    return copyPost;
  }).sort((a, b) => a["userName"].localeCompare(b["userName"]));
}

function sortByTitle(posts) {
  return posts.sort((a, b) => a["title"].localeCompare(b["title"]));
}

function sortById(posts) {
  return posts.sort((a, b) => a["id"] - b["id"]);
}

class App extends Component {

  constructor() {
    super();
    this.state = {
      posts: [],
      users: [],
      comments: [],
      visiblePosts: [],
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
        visiblePosts: [...posts]
      });
    }, 1000);
  };

  sort = (event) => {
    const sortItemsMap = {
      "id": sortById([...this.state.visiblePosts]),
      "name": sortByName([...this.state.visiblePosts], [...this.state.users]),
      "title": sortByTitle([...this.state.visiblePosts])
    };

    this.setState({ visiblePosts: sortItemsMap[event.target.value] });
  };

  filter = (event) => {

    let searchText = event.target.value.toLowerCase();
    const filteredPosts = this.state.posts.filter(post => post["title"].toLowerCase().includes(searchText));
    this.setState({ visiblePosts: filteredPosts });
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
            posts={this.state.visiblePosts}
            users={this.state.users}
            comments={this.state.comments}
          />
        </main>
      </div>
    );
  }
}

export default App;
