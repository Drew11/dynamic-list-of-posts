import React from 'react';
import Comment from './Comment';

function CommentList({id, comments}) {

    return <ul className={"post__comments"}>
        {<Comment id={id} comments={comments}/>}
        </ul>
}
export default CommentList;