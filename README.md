<hr>

<!-- Heading -->
# Web application - student project


## General information:
<!-- UL-->
* ### Subject at university: Advanced Database Technologies

* ### Work methodology: SCRUM (GitHub project tab)

* ### Technologies: Node.js, Express.js, MongoDB, Mongoose

<hr>

# Documentation:

## Database schema:
![database-schema](group-project-hotel.drawio.png)
# API:
| Users                | Booking                           | Category                       | Comment                |
|----------------------|-----------------------------------|--------------------------------|------------------------|
| `GET` /users         | `GET` /bookings                   | `GET` /categories/rooms        | `GET` /comments        |
| `GET` /users/:id     | `GET` /bookings/:id               | `GET` /categories/rooms/:id    | `POST` /comments       |
| `POST` /users/signup | `GET` /bookings/user              | `GET` /categories/rooms/params | `PUT` /comments/:id    |
| `PUT` /users/:id     | `GET` /bookings/search/parameters | `GET` /categories              | `DELETE` /comments/:id |
| `DELETE` /users/:id  | `POST` /bookings                  | `POST` /categories             |
|                      | `PUT` /bookings/:id               | `POST` /categories/rooms       |
|                      | `DELETE` /bookings/:id            | `PUT` /categories/rooms/:id    |
|                      |                                   | `PATCH` /categories/:id        |
|                      |                                   | `DELETE` /categories/:id       |
|                      |                                   | `DELETE` /categories/room/:id  |
|                      |                                   | `GET` /categories/:id          |


| Restaurant                        | Table                           | Reservation                          |
|-----------------------------------|---------------------------------|--------------------------------------|
| `GET` /restaurant/:id/menu        | `GET` /tables                   | `GET` /reservation                   |
| `GET` /restaurant/:id/dish/:id    | `GET` /tables/:id               | `GET` /reservation/:id               |
| `POST` /restaurant/:id/dish       | `GET` /tables/search/parameters | `GET` /reservation/search/parameters |
| `POST` /restaurant                | `POST` /tables                  | `POST` /reservation                  |
| `PATCH` /restaurant/:id           | `PUT` /tables/:id               | `PUT` /reservation/:id               |
| `PUT` /restaurant/:id/dish/:id    | `DELETE` /tables/:id            | `DELETE` /reservation/:id            |
| `DELETE` /restaurant/:id/dish/:id |
| `DELETE` /restaurant/:id          |


## Catalog structure:

<pre>
|___.github
|___.gitignore
|___README.md
|___Hotel.postman_collection.json
|___frontend
|___backend___
              |___README.md
              |___.eslintrc.json
              |___.env
              |___.dockerignore
              |___Dockerfile
              |___docker-compose.yml
              |___mongo-init.js
              |___package-lock.json
              |___package.json
              |___src___
                        |___server.js
                        |___middleware -> logic for: authentication, authorization, ...
                        |___models -> database models
                        |___routes -> application routes (urls)
                        |___controllers -> all business logic
                        |___config -> database and passport.js configurations
                        |___seeder -> data and logic to seed database
                        |_____tests__ -> unit tests, integration Tests, ...
</pre>
<hr>

### Indexes for MongoDB:
* #### Booking: startsAt, endsAt
* #### Reservation: startsAt, endsAt
* #### Rooms: features, price
* #### Users: email, role
