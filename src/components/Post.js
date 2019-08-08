import React from 'react';
import User from './User';
import CommentList from './CommentList';

function Post({post, user , comments , index}) {

    return <li key={index}> {post["id"]+": "+post["title"]}
            <span className={"post__comments-readmore"}>{"comments..."}</span>
            <CommentList comments = {comments}/>
            <User user={user} />
          </li>
}
export default Post;