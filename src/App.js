import React, { Component } from 'react';
import PostList from './components/PostList';
import { getPosts, getUsers, getComments } from './utils/helper';
import './App.css';

function sortByName(posts, users) {
   return posts.map((post)=> {
            const user = users.find((user)=>user["id"]===post['userId']),
            copyPost = {...post};
            copyPost['userName'] = user['name'];
            return copyPost;})
           .sort((a, b)=>a['userName'].localeCompare(b['userName']));
}

function sortByTitle(posts) {
    return posts.sort( (a, b) => a['title'].localeCompare(b['title']) );
}

function sortById(posts) {
    return posts.sort((a, b) => a['id']-b['id']);
}

class App extends Component{

  constructor(){
    super();
    this.state={
      posts:[],
      users:[],
      comments:[],
      sortedPosts:[],
      isLoading: false,
      completeLoad: false,
    };
  }

  getData = async ()=>{
    const [posts, users, comments] = await Promise.all([
        getPosts(),
        getUsers() ,
        getComments(),
    ]);

      this.setState({isLoading: true});

      setTimeout(()=>{
          this.setState({
              posts: posts,
              users: users,
              comments: comments,
              completeLoad: true
          });
      },1000)
  };

  sort =(event)=> {
      const sortItemsMap = {
          'id': sortById( [...this.state.posts]),
          'name': sortByName( [...this.state.posts], [...this.state.users]),
          'title': sortByTitle( [...this.state.posts])
       };

      this.setState({posts:  sortItemsMap[event.target.value],
                     sortedPosts: sortItemsMap[event.target.value],
      })
  };

   filter =  async(event)=> {
        let searchText = event.target.value.toLowerCase();
        const filteredPosts = this.state.sortedPosts.filter(post => post['title'].toLowerCase().includes(searchText));
        this.setState({posts: filteredPosts});
    };

  render(){
      return (
          <div className="App">
              <header className="App-header">
                  <h1>Dynamic List Of Posts</h1>
              </header>
             <div className={"App-nav"}>
                 {!this.state.completeLoad ? <button
                         className={"btn-load"}
                         onClick={this.getData}
                     >{!this.state.isLoading? "Load": "Loading..."}
                     </button> :
                     <>
                     <select  onChange={this.sort}>
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
                  posts={this.state.posts}
                  users={this.state.users}
                  comments={this.state.comments}
                  />
              </main>
          </div>
      );
  }
}

export default App;
