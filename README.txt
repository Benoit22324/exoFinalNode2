- - - - - - - - - - - - - - - - -
| Pour avoir le projet en local |
- - - - - - - - - - - - - - - - -

1. git clone https://github.com/Benoit22324/exoFinalNode2.git

2. npm install

3. npm run dev

- - - - - - - - - - - - - - - 
| Pour avoir la bdd en local |
- - - - - - - - - - - - - - - 
1. npm run generate

2. npm run migrate

3 (optionnel). npm run studio

N'oubliez pas de mettre dans votre .env, les variables suivantes: PORT, DATABASE_URL, JWT_SECRET, NODE_ENV

- - - - - 
| Routes |
- - - - - 

/quiz
    /               [GET]       Get All Quizs
    /:id            [GET]       Get a Specific Quiz
    /               [POST]      Add a Quiz
    /:id            [PUT]       Update a Specific Quiz
    /:id            [DELETE]    Delete a Specific Quiz

/part
    /:quizId/:index [GET]       Get a Specific Quiz Part
    /:quizId        [POST]      Add a Quiz Part
    /:id            [PUT]       Update a Specific Quiz Part
    /:id            [DELETE]    Delete a Specific Quiz Part

/user
    /               [GET]       Get the connected User
    /               [PUT]       Update the connected User
    /               [DELETE]    Delete the connected User

/auth
    /logout         [GET]       Disconnect the connected User
    /login          [POST]      Connect to a User
    /register       [POST]      Register a New User

/comment
    /:userId        [GET]       Get All User Comments
    /:quizId        [POST]      Add a Comment
    /:id            [PUT]       Update a Specific Comment
    /:id            [DELETE]    Delete a Specific Comment

/run
    /:id            [GET]       Get a Specific Run
    /               [POST]      Add a Run
    /:id            [PUT]       Update a Specific Run
    /:id            [DELETE]    Delete a Specific Run