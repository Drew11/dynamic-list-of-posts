import React from 'react';

function Comment({postId, comment}) {

       return <li className={"post__comment"}>{"name: " + comment['name']}
                <span className={"post__comment-body"}>{comment['body']}</span>
                <span className={"post__comment-email"}>{"email: "+comment['email']}</span>
            </li>
}
export default Comment;