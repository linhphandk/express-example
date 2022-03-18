# To run

1. find the sql script in docker-entrypoint-initdb.d to create the database
2. create a .env file for enviroment variables look for description below
3. run npm install to get all the dependencies
4. run npm start and the server is listening to your port on 8000 fyi not working with cors forgot to add it please use postman or curl

# .env file

to store the credential locally instead of the source code create a .env file in the root directory an example would be

    USERNAME=mysql
    PASSWORD=root
    DATABASE=Example
    SALT_ROUNDS=10
    DATABASE_URL=localhost

# Notes

you can see in app.js you are using app.get and app.post you can guess that there are also app.put and app.delete

in the sql query we use ? to parametrize the values to avoid sql injection

we use pool instead of a regular connection so we do not have to connect every time
