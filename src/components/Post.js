import React from 'react';
import User from './User';
import CommentList from './CommentList';

function Post({post , users , comments}) {
    return <li >{post["id"]+": "+post["title"]}
            <User id={post['userId']} users={users} />
            <span className={"post__comments-readmore"}>{"comments..."}</span>
            <CommentList postId={post['id'] } comments={comments}/>
         </li>
}
export default Post;