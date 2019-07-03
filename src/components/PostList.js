import React from 'react';
import Post from './Post';

function PostList({posts, users, comments }) {
    return <ul className={"post__list"}>
             {posts.map((post, index)=><Post
                                index={index}
                                users={users}
                                post={post}
                                comments={comments}
                              />
             )}
           </ul>
}

export default PostList;