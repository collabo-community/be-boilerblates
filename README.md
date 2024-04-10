# Collabo Backend Api Boilerplates
Collabo Backend Api Boilerplates


# testing the Authentication

<br/>

## User Authentication Summary

- cd in the `ts-esm-async-await` template folder
- run `npm install` to download the new added package dependencies
- start the server with `npm run dev:atlas` or `npm run dev:local`
- follow the API endpoint summary below to test.
  > NOTE: Implementation can be found on the **`Collabo Postman Workspace`**

|METHOD /endpoint|Description|Request body|
|--|--|:--:|
|POST user/auth/signup|Create/register a new user|username, email, password|
|POST user/auth/login|authenticate and signs in a registered user|email, password|
|GET /user/get-all|Get all users in the database (no authentication [i.e login] required)|No Request Body|
|GET /user/auth/get-profile|Gets the currently logged in user profile (authentication requred) |No Request Body|
|PUT /user/auth/update-profile|allows a logged in user to update all his/her profile properties (authentication requred)|username, email, password|
|PATCH /user/auth/update-profile-any|allows a logged in user to update one or any of his/her profile properties (authentication requred)|propName, value|
|DELETE /user/auth/delete|Delete a user from the database by ID (authentication requred)|No request body|
|DELETE /user/delete-all|Delete a user from the database by ID (no auth is required)|No request body|

<br/>


## User Authentication API call requests and responses

<details>
<summary>POST /user/auth/signup</summary>
<br/>
    <b>Request body shape</b>
    <br/><br/>
<pre>
{
  "username": "string",
  "email": "string",
  "password": "string",
}
</pre>
<br/>
     <b>Successful response shape</b>
    <br/><br/>
<pre>
{
    "success": boolean,
    "data": {
        "user": {
            "_id": "string",
            "username": "string",
            "email": "string",
            "role": "string",
            "createdAt": "string - date",
            "updatedAt": "string - date"
        },
        "token": "string"
    },
    "message": "string"
}
</pre>
</details>




<details>
<summary>POST /user/auth/signin</summary>
<br/>
    <b>Request body shape</b>
    <br/><br/>
<pre>
{
    "email": "string (required)", 
    "password": "string (required)"
}
</pre>
<br/>
     <b>Successful response shape</b>
    <br/><br/>
<pre>
{
    "success": string,
    "data": {
        "token": "string"
    },
    "message": "string"
}
</pre>
</details>



<details>
<summary>GET /user/get-all</summary>
<br/>
    <b>Request body shape</b>
    <br/><br/>
<pre>
No request body
</pre>
<br/>
     <b>Successful response shape</b>
    <br/><br/>
<pre>
{
    "success": boolean,
    "data": {
        "count": number,
        "users": [
            {
                "_id": "string",
                "username": "string",
                "email": "string",
                "role": "string",
                "createdAt": "string",
                "updatedAt": "string"
            }
        ]
    },
    "message": "string"
}
</pre>
</details>



<details>
<summary>GET /user/auth/get-profile</summary>
<br/>
    <b>Request body shape</b>
    <br/><br/>
<pre>
No request body
</pre>
<br/>
     <b>Successful response shape</b>
    <br/><br/>
<pre>
{
    "success": boolean,
    "data": {
        "user": {
            "_id": "string",
            "username": "string",
            "email": "string",
            "role": "string",
            "createdAt": "string",
            "updatedAt": "string"
        }
    },
    "message": "string"
}
</pre>
</details>


<details>
<summary>PUT /user/auth/update-profile</summary>
<br/>
    <b>Request body shape</b>
    <br/><br/>
<pre>
{
    "username": "string",
    "email": "string",
    "password": "string",
}
NOTE: no property can be ommited
</pre>
<br/>
     <b>Successful response shape</b>
    <br/><br/>
<pre>
{
    "success": boolean,
    "data": {},
    "message": "string"
}
</pre>
</details>


<details>
<summary>PATCH /user/auth/update-profile-any</summary>
<br/>
    <b>Request body shape</b>
    <br/><br/>
<pre>
[
    { "propName": "string", "value": "string" }
]
</pre>
<br/>
     <b>Successful response shape</b>
    <br/><br/>
<pre>
{
    "success": boolean,
    "data": {},
    "message": "string"
}
</pre>
</details>


<details>
<summary>DELETE /user/auth/delete</summary>
<br/>
    <b>Request body shape</b>
    <br/><br/>
<pre>
No request body
</pre>
<br/>
     <b>Successful response shape</b>
    <br/><br/>
<pre>
{
    "success": boolean,
    "data": {},
    "message": "string"
}
</pre>
</details>


<details>
<summary>DELETE /user/delete-all</summary>
<br/>
    <b>Request body shape</b>
    <br/><br/>
<pre>
No request body
</pre>
<br/>
     <b>Successful response shape</b>
    <br/><br/>
<pre>
{
    "success": boolean,
    "data": {},
    "message": "string"
}
</pre>
</details>

</br>
<br/>