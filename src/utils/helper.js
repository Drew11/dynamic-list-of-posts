const getPosts = () => {
    return fetch('https://jsonplaceholder.typicode.com/posts')
        .then(res => res.json());
};

const getUsers = () => {
    return fetch('https://jsonplaceholder.typicode.com/users')
        .then(res => res.json());
};

const getComments = () => {
    return fetch('https://jsonplaceholder.typicode.com/comments')
        .then(res => res.json());
};

export  { getPosts, getUsers, getComments };