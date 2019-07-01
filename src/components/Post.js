import React from 'react';

function Post({post}) {
    return <li >{post["id"]+": "+post["title"]}
    </li>
}
export default Post;