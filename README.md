# Northcoders House of Games API

This project is the back-end project of the Northcoders Bootcamp. It was build using TDD and implemented using Express and Postgres to create a functional API.

[You can see live verion of the app on the following link](https://northcoders-nc-games.herokuapp.com/api)

## Tech Stack

<img src="https://cdn.iconscout.com/icon/free/png-256/javascript-2752148-2284965.png " alt="JavaScript" width="40"/>
<img src="data:image/png;base64,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 " alt="Express" width="40"/>
<img src="https://w7.pngwing.com/pngs/396/90/png-transparent-postgresql-database-logo-computer-icons-replication-software-developer-miscellaneous-blue-mammal-thumbnail.png" alt="PostgresQl" width="40"/>
<img src="https://iconape.com/wp-content/png_logo_vector/jest-logo.png " alt="Jest" width="40"/>

<br><br>

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
        "ExampleResponse" :{
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
