import React from 'react';
import Comment from './Comment';

function CommentList({comments}) {

    return <ul className={"post__comments"}>
             {comments.map((comment, index)=> <Comment
               key={index}
               comment={comment}/>)}
           </ul>
}
export default CommentList;