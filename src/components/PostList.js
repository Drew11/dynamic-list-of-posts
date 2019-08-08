import React from 'react';
import Post from './Post';

function PostList({posts}) {
    return <ul className={"post__list"}>
             {posts.map((post, index)=>{
             const user = post.user;
             const comments = post.commentsPost;

              return  <Post
                 key={index}
                 user={user}
                 post={post}
                 comments={comments}
               />}
             )
             }
           </ul>
}

export default PostList;