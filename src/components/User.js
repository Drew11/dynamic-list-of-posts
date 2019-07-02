import React from 'react';

function User({id, users}){
        const user = users.find(user=>user['id']=== id);
        return <div className={"post-info"}>
                <li>{`author: ${user['name']}`}</li>
                <li>{`email: ${user['email']}`}</li>
                <li>{`address: ${user['address']["street"]}`}
                             {`${user['address']["suite" ]} `}
                             {`${user['address']["city"]} `}
                             {`${user['address']["zipcode"]} `}
                </li>
              </div>
}
export default User;