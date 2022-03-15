<!-- Heading -->
# Web application - student project


## General informations:
<!-- UL-->
* ### Subject at university: Advanced Database Technologies

* ### Work methodology: SCRUM (Github project tab)

* ### Technologies: Node.js, MongoDB, Mongoose

</hr>

# Documentation:

## Database schema:
![database-schema](group-project-hotel.drawio.png)
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