# Northcoders House of Games API

This project is the back-end project of the Northcoders Bootcamp. It was build using TDD and implemented using Express and Postgres to create a functional API.

[You can see live verion of the app on the following link](https://northcoders-nc-games.herokuapp.com/api)

## Tech Stack

<img src="./icons/js.png" alt="JavaScript" width="40"/>
<img src="./icons/express.png" alt="Express" width="40"/>
<img src="./icons/postgresql.png" alt="PostgresQl" width="40"/>
<img src="./icons/jest.png" alt="Jest" width="40"/>

<br>

---

## Cloning

To clone the project fork it from my repo and run the following comand on your machine <br />

```javascript
git clone "your_fork's_url"'
```

---

## Installing

To install all of the dependencies on your machine navigate to the project directory and run to install everything you need for the API to work locally on your machine

```javascript
npm install
```

---

## Seeding the Database

### .env files

In order to successfully connect to the databases and run it locally you will have to create a .env files and set the correct database name for the correct environment.<br /> You can do this by adding **PGDATABASE=db-name** where db-name is going to be the correct DB name.<br /> You can find information of DB names in **/db/setup.sql** file.
<br> Also make sure you **.gitignore** this files so you dont share your environment variables.

To seed the database locally you need to run the scripts provided with the following commands<br />

```javascript
npm run setup-dbs
```

-to set up the Database<br />

```javascript
 npm run seed
```

-to seed the Database<br />

---

## Running Tests

To run the tests you will have to run

```javascript
npm run "test_file_name"'
```

where **test_file_name** is going to be the name of the test file you want to run.<br />
If you are not in the directory where the tests are, you will have to provide relative path to the test file

---

## Minimum version requrements

- Node.js: v18.2.0
- Postgres: v12.9

---

### Bellow you can find all of the available endpoint on the API

```javascript
{
  "endpoints": {
    "GET /api": {
      "description": "serves up a json representation of all the available endpoints of the api"
    },
    "GET /api/categories": {
      "description": "serves an array of all categories",
      "queries": [

      ],
      "exampleResponse": {
        "categories": [
          {
            "description": "Players attempt to uncover each other's hidden role",
            "slug": "Social deduction"
          }
        ]
      }
    },
    "GET /api/reviews": {
      "description": "serves an array of all reviews",
      "queries": [
        "category",
        "sort_by",
        "order"
      ],
      "exampleResponse": {
        "reviews": [
          {
            "title": "One Night Ultimate Werewolf",
            "designer": "Akihisa Okui",
            "owner": "happyamy2016",
            "review_img_url": "https://images.pexels.com/photos/5350049/pexels-photo-5350049.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
            "category": "hidden-roles",
            "created_at": 1610964101251,
            "votes": 5
          }
        ]
      }
    },
    "GET /api/users": {
      "description": "serves an array of all users",
      "queries": [

      ],
      "exampleResponse": {
        "users": [
          {
            "username": "mallionaire",
            "name": "haz",
            "avatar_url": "'https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg'"
          }
        ]
      }
    },
    "GET reviews/:review_id": {
      "description": "serves a review object that matches the review_id(example of review_id =2)",
      "queries": [

      ],
      "exampleResponse": {
        "reviews": [
          {
            "review_id": 2,
            "title": "Jenga",
            "review_body": "Fiddly fun for all the family",
            "designer": "Leslie Scott",
            "review_img_url": "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
            "votes": 5,
            "category": "dexterity",
            "owner": "philippaclaire9",
            "created_at": "2021-01-18T10:01:41.251Z",
            "comment_count": 3
          }
        ]
      }
    },
    "GET reviews/:review_id/comments": {
      "description": "serves an array of comments for the review with id that matches the review_id(example of review_id =2)",
      "queries": [

      ],
      "exampleResponse": {
        "comments": [
          {
            "body": "I loved this game too!",
            "votes": 16,
            "author": "bainesface",
            "review_id": 2,
            "created_at": "new Date(1511354613389)"
          }
        ]
      }
    },
    "PATCH reviews/:review_id": {
      "description": "serves a review object that has been modified",
      "queries": [

      ],
      "requestBody": {
        "inc_votes": "newVote"
      },
      "exampleResponse": {
        "reviews": [
          {
            "review_id": 2,
            "title": "Jenga",
            "review_body": "Fiddly fun for all the family",
            "designer": "Leslie Scott",
            "review_img_url": "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
            "votes": 6,
            "category": "dexterity",
            "owner": "philippaclaire9",
            "created_at": "2021-01-18T10:01:41.251Z",
            "comment_count": 3
          }
        ]
      }
    },
    "POST reviews/:review_id/comments": {
      "description": "serves a newly added comment for the specific review",
      "queries": [

      ],
      "requestBody": {
        "username": "philippaclaire9",
        "body": "New Comment for review 2"
      },
      "exampleResponse": {
        "reviews": [
          {
            "comment_id": 7,
            " body": "New Comment for review 2",
            "votes": 0,
            "author": "philippaclaire9",
            "review_id": 2
          }
        ]
      }
    },
    "DELETE /api/comments/:comment_id": {
      "description": "deletes comment with given id, responds with no content",
      "queries": [

      ],
      "exampleResponse": {

      }
    },
    "GET /api/users/:username" :{
        "description" : "serves an user object that matches the username provided (example /api/users/dav3rid",
        "queries" : [

        ],
        "exampleResponse" : {
            "user":{
                " username": "dav3rid",
                "name": "dave",
                "avatar_url": "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
            }
        }
    },
    "PATCH /api/comments/:comment_id" : {
        "description" : "serves the coresponding comment object with updated votes (example: /api/comments/2)"
        "queries" :[

        ],
        "requestBody": {
        "inc_votes": 1,
      },
      "exampleResponse" : {
         " comment_id": 2,
         " body": "My dog loved this game too!",
          "votes": 14,
          "author": "mallionaire",
          "review_id": 3,
          "created_at": "2021-01-18T10:09:05.410Z"
      }

    },
    "POST /api/reviews" : {
        "description": " serves the newly created review object",
        "queries" :[

        ],
        "requestBody" : {
            "title": "New Review Title",
             "designer": "Kristina",
            "owner": "philippaclaire9",
            "review_body": "Fiddly fun for all the family",
            "category": "dexterity",
        },
        "exampleResponse" :{
            "review_id": 14,
            "title": "New Review Title",
            "designer": "Kristina",
            "owner": "philippaclaire9",
            "review_body": "Fiddly fun for all the family",
            "category": "dexterity",
            "review_img_url": "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg"
        }
    }
  }
}
```
