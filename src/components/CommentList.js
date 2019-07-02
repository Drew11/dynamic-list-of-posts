import React from 'react';
import Comment from './Comment';

function CommentList({postId, comments}) {

    const comment =  comments.filter((comment)=>comment['postId'] === postId);

    return <ul className={"post__comments"}>
             {comment.map((comment)=> <Comment comment={comment}/>)}
           </ul>
}
export default CommentList;