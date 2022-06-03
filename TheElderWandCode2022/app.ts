import express  from "express";
import ejs, { name } from 'ejs';
import{MongoClient, ObjectId} from 'mongodb';
const bcrypt = require('bcrypt');
const session =  require('express-session');

const uri = "mongodb+srv://s133181:Papier10.@login.wqoqa.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

const app = express();

app.set("port", 3000);
app.set("view engine", "ejs");

app.use(express.urlencoded({extended: true}));

interface Person {
    _id?: ObjectId,
    name: string,
    email: string,
    password: string;
}

app.get("/", (req, res) => {
    res.render('index');
});
app.post("/", (req, res) => {
    res.render('index');
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
        let user = await UsersCollectien.find<Person>({}).toArray();
        res.redirect('/login')

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
    await client.connect();

    let UsersCollectien = client.db("IT-Project").collection("Users");
  

    let user= await client.db("IT-Project").collection("Users").findOne<Person>({email: `${req.body.email}`});
    console.log(1)
    if (user == null) {
        console.log(2)
        return res.status(404).send('Cannot find user')
     }
     console.log(3)
     try {
         if ( await bcrypt.compare(req.body.password, user.password)){
            
            res.redirect('/')
         } else {
             res.send('Password incorrect')
         }
      } catch {
          res.status(400).send('Cannot find user')
      }finally {
         client.close();
     }
})

app.post('/logout', (req, res) => {
    req.body.user= null;
    res.render('login');
});

app.listen(app.get("port"), () => {
    console.log(`App started on http://localhost:${app.get("port")}`)
});
