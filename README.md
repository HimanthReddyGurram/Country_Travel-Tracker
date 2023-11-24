# Country Travel-Tracker
A website where we can create users and track the countries a specific user went in a visually appealing manner.
(This website has a backend so the data doesnot get lost when refreshing websites or servers.)

## Technologies
* Javascript
  - ejs
* Node.js
  - Express.js
* Sql
  - postgresql


## How to use
To clone and run this application, you'll need Git, Node.js (which comes with npm) and postgresql installed on your computer.

After installing pgAdmin which is a management tool for PostgreSQL, create a database with some name.

Now the run the code which is there in the **queries.sql** file into the query tool.

If you are having trouble doing that then just insert the code into the place shown in the image below on pgAdmin and run the queries.

![image](https://miro.medium.com/v2/resize:fit:916/1*IQqAlh30q_pFpVp0KomL2w.png)

In the following code which spans from line 8 to 14 on index.js file, please insert user and password values from when you register with pgAdmin on your local pc and database name from when you created a database.
```javascript
const db = new pg.Client({
  user: "",
  host: "localhost",
  database: "",
  password: "",
  port: 5432,
});
```
If you want to start working on your project right away, you might want to try the following commands:

From your command line:
```bash
# Clone this repository
git clone https://github.com/HimanthReddyGurram/Country_Travel-Tracker.git

# Go into the repository
$ cd Country_Travel-Tracker.git

# Install dependencies
npm install

#Run the app
nodemon index.js
```
The output will be "Server started on port 4000"

## User Interface
Now you can add users by clicking on add family member option and select a colour and then you can add countries which whill be filled by the colour you selected.
