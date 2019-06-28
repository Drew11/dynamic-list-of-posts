import React from 'react';

function Comment({id, comments}) {

    const comment = comments.filter(comment=>comment['postId']===id);

    return comment.map(comment=>{
       return <li className={"post__comment"}>{"name: " + comment['name']}
                <span className={"post__comment-body"}>{comment['body']}</span>
                <span className={"post__comment-email"}>{"email: "+comment['email']}</span>
            </li>
    })

}
export default Comment;