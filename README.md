[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)


# Heroku URL
https://guarded-falls-97072.herokuapp.com/

I used General Assembly's express-api-template in order to implement my express backend server for this project. All authentication actions were pre completed via the User model. I originally implemented a Many-to-Many relationship between Teams and Players (A user has many teams, a team has many players), however due to time restrictions, the final product become a One to Many relationship between users and teams (A user has many Teams). I deployed my backend to a Heroku website, and the frontend was deployed to github pages.

# Planning
I ran into a lot of problems with creating players as objects originally in the many-to-many relationship that I tried to implement in my first build. Which caused my models to change, and instead implement a players array within the Team model. This allowed me to then complete all crud actions on both the frontend and the backend. The only other issue that I had on my backend was attempting to change the Promise chain for patch / delete / creating a team. I wished to change the function that allows it to find it by ID and instead allow it to findOne that matched the team name and belonged to the owner. By doing this, I would improve usability for the typical user that does not wish to copy paste a long, hashed out ID each time they wish to make changes.

# Future Improvements
- I hope to implement a findone method that allows me to find team names instead of just by ID. I used it on project 3, however did not have enough time to research it effectively for this project.
- re configuring my .csv and implementing that for build 3.

## CRUD Action / Routes

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| POST   | `/teams`               | `teams#create`    |
| PATCH  | `/teams/:_id`          | `teams#edit`      |
| SHOW   | `/teams/:_id`           | `teams#show`      |
| DELETE | `/teams/:_id`          | `teams#delete`    |


### Authentication

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| POST   | `/sign-up`             | `users#signup`    |
| POST   | `/sign-in`             | `users#signin`    |
| PATCH  | `/change-password/`    | `users#changepw`  |
| DELETE | `/sign-out/`           | `users#signout`   |

# Entity Relationship Diagram
<a href="https://imgur.com/7VIPbeW"><img src="https://i.imgur.com/7VIPbeW.jpg"/></a>


## [License](LICENSE)

1.  All content is licensed under a CC­BY­NC­SA 4.0 license.
1.  All software code is licensed under GNU GPLv3. For commercial use or
    alternative licensing, please contact legal@ga.co.
