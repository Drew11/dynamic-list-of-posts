import React, { Component } from 'react';
import PostList from './components/PostList';
import { getPosts, getUsers, getComments } from './utils/helper';
import './App.css';

class App extends Component{

  constructor(){
    super();
    this.state={
      posts:[],
      users:[],
      comments:[],
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
      },2000)
  };

  sort =(event)=> {
      const posts = [...this.state.posts];
      const users = this.state.users;
      let updatePosts;

      switch (event.target.value){
                case 'name':
                    updatePosts = posts.map((post)=> {
                                 const user = users.find((user)=>user["id"]===post['userId']),
                                       copyPost = {...post};
                                 copyPost['userName']= user['name'];
                                 return copyPost;
                                  })
                                  .sort(function (a, b) {
                                    return  a['userName'].localeCompare(b['userName'])
                                  });
                    break;

                case 'id': updatePosts = posts.sort((a, b)=>a['id']-b['id']);
                    break;

                case 'title': updatePosts = posts.sort((a, b)=>a['title'].localeCompare(b['title']));
                    break;

                default:
                    return;
      }

      this.setState({posts:  updatePosts})
  };

   filter =  async(event)=> {
        let searchText = event.target.value.toLowerCase(),
           filteredPosts;
        const posts = [...await getPosts()];
        if(event){
            filteredPosts = posts.filter(post => post['title'].toLowerCase().includes(searchText));
        }else {
            filteredPosts = posts;
        }
        this.setState({posts: filteredPosts});
    };

  render(){

      return (
          <div className="App">
              <header className="App-header">
                  <h1>Dynamic List Of Posts</h1>
              </header>

             <div className={"App-nav"}>
                 {!this.state.completeLoad?<button
                         className={"btn-load"}
                         onClick={this.getData}
                     >{!this.state.isLoading?"Load": "Loading..."}</button>:
                     <>
                     <select  onChange={(event)=>{this.sort(event)}}>

                         <option value="id">Sorted By Id</option>
                         <option value="name">Sorted By User Name</option>
                         <option value="title">Sorted By Text</option>

                     </select>

                     <input className={"search"}
                            type={"text"}
                            onChange={(event)=>this.filter(event)}
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
