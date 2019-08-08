import React from 'react';

function User({user}){

        return <ul className={"post-info"}>
                <li>{`author: ${user['name']}`}</li>
                <li>{`email: ${user['email']}`}</li>
                <li>{`
                      address: ${user['address']["street"]}
                      ${user['address']["suite" ]}
                      ${user['address']["city"]}
                      ${user['address']["zipcode"]}
                     `}
                </li>
              </ul>
}
export default User;