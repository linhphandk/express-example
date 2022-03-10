# To run

1. find the sql script in docker-entrypoint-initdb.d to create the database
2. change the mysql configuration to the credentials of your database
3. run npm start and the server is listening to your port on 8000 fyi not working with cors forgot to add it please use postman or curl

# Notes

you can see in app.js you are using app.get and app.post you can guess that there are also app.put and app.delete

in the sql query we use ? to parametrize the values to avoid sql injection

we use pool instead of a regular connection so we do not have to connect every time
