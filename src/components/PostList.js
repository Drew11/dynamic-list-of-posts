import React from 'react';
import Post from './Post';
import User from './User';
import CommentList from './CommentList';

function PostList({posts, users, comments }) {


    return <ul className={"post__list"}>
        {posts.map(post=>{
        return<>
            <Post post={post}/>
            <User id={post['userId']} users={users} />
            <span className={"post__comments-readmore"}>{"comments..."}</span>
            <CommentList id={post['id'] } comments={comments}/>
        </>
         })
       }
    </ul>
}

export default PostList;