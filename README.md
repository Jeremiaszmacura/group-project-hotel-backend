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
| Users                | Booking                | Category                       | Comment                |
|----------------------|------------------------|--------------------------------|------------------------|
| `GET` /users         | `GET` /bookings        | `GET` /categories/rooms        | `GET` /comments        |
| `GET` /users/:id     | `GET` /bookings/:id    | `GET` /categories/rooms/:id    | `POST` /comments       |
| `POST` /users/signup | `GET` /bookings/user   | `GET` /categories/rooms/params | `PUT` /comments/:id    |
| `PUT` /users/:id     | `POST` /bookings       | `GET` /categories              | `DELETE` /comments/:id |
| `DELETE` /users/:id  | `DELETE` /bookings/:id | `POST` /categories             |
|                      |                        | `POST` /categories/rooms       |
|                      |                        | `PUT` /categories/rooms/:id    |
|                      |                        | `PATCH` /categories/:id        |
|                      |                        | `DELETE` /categories/:id       |
|                      |                        | `DELETE` /categories/room/:id  |
|                      |                        | `GET` /categories/:id          |


| Restaurant                        | Table                | Reservation                |
|-----------------------------------|----------------------|----------------------------|
| `GET` /restaurant/:id/menu        | `GET` /tables        | `GET` /reservations        |
| `GET` /restaurant/:id/dish/:id    | `GET` /tables/:id    | `GET` /reservations/:id    |
| `GET` /restaurant                 | `GET` /tables/params | `GET` /reservations/params |
| `POST` /restaurant/:id/dish       | `POST` /tables       | `POST` /reservations       |
| `POST` /restaurant                | `PUT` /tables/:id    | `DELETE` /reservations/:id |
| `PUT` /restaurant/:id             | `DELETE` /tables/:id |                            |
| `PUT` /restaurant/:id/dish/:id    |
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
