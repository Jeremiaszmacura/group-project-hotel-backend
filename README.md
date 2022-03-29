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
| Users                | Booking                           | Room                           | Comment               |
|----------------------|-----------------------------------|--------------------------------|-----------------------|
| `GET` /users         | `GET` /bookings                   | `GET` /rooms                   | `GET` /comments       |
| `GET` /users/id      | `GET` /bookings/id                | `GET` /rooms/id                | `POST` /comments      |
| `POST` /users/signup | `GET` /bookings/search/parameters | `GET` /rooms/search/parameters | `PUT` /comments/id    |
| `PUT` /users/id      | `POST` /bookings                  | `GET` /rooms/category          | `DELETE` /comments/id |
| `DELETE` /users/id   | `PUT` /bookings/id                | `POST` /rooms/category         |
|                      | `DELETE` /bookings/id             | `POST` /rooms                  |
|                      |                                   | `PUT` /rooms/id                |
|                      |                                   | `PATCH` /rooms/category/id     |
|                      |                                   | `DELETE` /rooms/category/id    |


| Restaurant                      | Table                           | Reservation                          |
|---------------------------------|---------------------------------|--------------------------------------|
| `GET` /restaurant/id/menu       | `GET` /tables                   | `GET` /reservation                   |
| `GET` /restaurant/id/dish/id    | `GET` /tables/id                | `GET` /reservation/id                |
| `POST` /restaurant/id/dish      | `GET` /tables/search/parameters | `GET` /reservation/search/parameters |
| `POST` /restaurant              | `POST` /tables                  | `POST` /reservation                  |
| `PATCH` /restaurant/id          | `PUT` /tables/id                | `PUT` /reservation/id                |
| `PUT` /restaurant/id/dish/id    | `DELETE` /tables/id             | `DELETE` /reservation/id             |
| `DELETE` /restaurant/id/dish/id |
| `DELETE` /restaurant/id         |


## Catalog structure:

<pre>
|___.gitignore
|___README.md
|___frontend
|___backend___
              |___README.md
              |___.eslintrc.json
              |___package-lock.json
              |___package.json
              |___src___
                        |___server.js
                        |___middleware -> logic for: authentication, authorization, ...
                        |___models -> database models
                        |___routes -> application routes (urls)
                        |___controllers -> all business logic
                        |_____tests__ -> unit tests, integration Tests, ...
</pre>
<hr>

### Indexes for MongoDB:
* #### Booking: startsAt, endsAt
* #### Reservation: startsAt, endsAt
* #### Rooms: features, price
* #### Users: email, role

# Developing rules:
<!-- UL-->
* ### branch namespace: feature or fix + "/" + the first part of issue title, for example: feature/backend-04, fix/backend-11, feature/documentation-02, ...
