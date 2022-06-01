import express  from "express";
import ejs, { name } from 'ejs';
import{MongoClient, ObjectId} from 'mongodb';
const bcrypt = require('bcrypt');
const {check} = require('express-validator')
const router = express.Router();


const uri = "mongodb+srv://s133181:Papier10.@login.wqoqa.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

const app = express();

app.set("port", 3000);
app.set("view engine", "ejs");

app.use(express.json({limit: '1mb'}));
app.use(express.urlencoded({extended: true}));

interface Person {
    _id?: ObjectId,
    name: string,
    email: string,
    password: string;
}

app.get("/", (req, res) => {
    res.render("app");
});


app.get("/register", (req, res) => {
    res.render("register");
})

app.post("/register", async(req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await client.connect();
        let UsersCollectien = client.db("IT-Project").collection("Users");

        await UsersCollectien.insertOne({
            id : ObjectId,
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });
        // let users = await UsersCollectien.find<Person>({}).toArray();
        res.redirect('/login')
        /*res.render("users", {
            users: users
        }); */

    } catch (e) {
        console.error(e);
    } finally {
        client.close();
    }

})

app.get('/login', (req, res) => {
    res.render('login.ejs')
})

app.post('/login', async (req, res) => {
    try {
        await client.connect();

        let UsersCollectien = client.db("IT-Project").collection("Users");

        await UsersCollectien.findOne({
            name: req.body.name,
            email: req.body.email
        });
        let users = await UsersCollectien.findOne<Person>({});

        res.render("user", {
            user: users
        });

    } catch (e) {
        console.error(e);
    } finally {
        client.close();
    }
    
})

app.listen(app.get("port"), () => {
    console.log(`App started on http://localhost:${app.get("port")}`)
});
