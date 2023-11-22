import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import ejs from 'ejs';

const app = express();
const port = 4000;
app.set('view engine' , 'ejs');

const db = new pg.Client({
  user: "himanth",
  host: "localhost",
  database: "school",
  password: "Joy@143100",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let current_user=1;
console.log(current_user)

async function checkVisisted() {
  const result = await db.query("SELECT country_code FROM visited_countries JOIN users ON users.id = user_id WHERE user_id = $1; ",
  [current_user]);
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

async function currentuser(){
const result= await db.query("SELECT * FROM users");
let users=result.rows;
return users.find((user)=>user.id==current_user)
}

async function totalusers(){
  const result= await db.query("SELECT * FROM users");
  let users=result.rows;
  return users
  }

app.get("/", async (req, res) => {
  const countries = await checkVisisted();
  const current_r=await currentuser();
  const tot_user= await totalusers();
  // console.log(tot_user,current_r.color)
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: tot_user,
    color: current_r.color,
  });
});
app.post("/add", async (req, res) => {
  const input = req.body["country"];

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) = ($1)",
      [input.toLowerCase()]
    );

    const data = result.rows[0];
    const countryCode = data.country_code;
    console.log(data,countryCode)
    try {
      await db.query(
        "INSERT INTO visited_countries (country_code,user_id) VALUES ($1,$2)",
        [countryCode,current_user]
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
      const countries = await checkVisisted();
  const current_r=await currentuser();
  const tot_user= await totalusers();
  // console.log(tot_user,current_r.color)
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: tot_user,
    color: current_r.color,
    error: "Country has already been added, try again.",
  });
    }
  } catch (err) {
    console.log(err);
    const countries = await checkVisisted();
  const current_r=await currentuser();
  const tot_user= await totalusers();
  // console.log(tot_user,current_r.color)
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: tot_user,
    color: current_r.color,
    error: "Country name doesnot exists, try again.",
  });
  }
});
app.post("/user", async (req, res) => {
  if (req.body.add=="new"){
    res.render('new.ejs')
  }else{
    current_user=req.body.user;
    res.redirect("/");
  }

});

app.post("/new", async (req, res) => {
  const name = req.body.name;
    const color = req.body.color;
    // console.log(name,color);
    try {
      const result = await db.query(
        "INSERT INTO users (name, color) VALUES($1, $2) RETURNING *;",
        [name, color]
      );
      const id = result.rows[0].id;
      current_user = id;
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
