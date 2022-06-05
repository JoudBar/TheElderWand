import express  from "express";
import ejs, { name } from 'ejs';
import{MongoClient, ObjectId} from 'mongodb';
const bcrypt = require('bcrypt');
const session =  require('express-session');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const uri = "mongodb+srv://s133181:Papier10.@login.wqoqa.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

const app = express();

app.set("port", 3000);
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));

interface Person {
    _id?: ObjectId,
    name: string,
    email: string,
    password: string;
}


app.get("/", (req, res) => {
    res.render('TheOne');
});
app.post("/", (req, res) => {
    res.render('TheOne');
});

app.get("/faq", (req, res) => {
    res.render('faq');
});
app.post("/faq", (req, res) => {
    res.render('faq');
});

app.get("/personages", (req, res) => {
    res.render('personages');
});
app.post("/personages", (req, res) => {
    res.render('personages');
});

app.get("/catalogus", (req, res) => {
    res.render('catalogus');
});
app.post("/catalogus", (req, res) => {
    res.render('catalogus');
});

app.get("/contact", (req, res) => {
    res.render('contact');
});
app.post("/contact", (req, res) => {
    const output = `
    <p>You have a new contact request</p>
    <h3>Contact details</h3>
    <ul>
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
    `;

    const transporter = nodemailer.createTransport({
        service: 'outlook',
        auth:{
            user: 'theelderwandtheone@outlook.com',
            pass: 'Theone1.'
        },
        tls:{
            rejectUnauthorized:false
          }
    });
    console.log(3);

    const mailOptions = {
        from: 'TheOne',
        to: 'theelderwandtheone@outlook.com',
        subject: 'Node contact request',
        text : 'hello world',
        html : output
    };
    console.log(4);

    transporter.sendMail(mailOptions, (error: any, info: any) => {
        console.log(5)
        if (error) {
            res.send('error')
        console.log(6)
        } else {
            console.log('email sent: '+ info.response)
            res.send('We hebben uw bericht goed ontvangen, we zullen zo snel mogelijk reageren op uw vragen!')
        }
    })
});

app.get("/quiz", (req, res) => {
    res.render('quiz');
});
app.post("/quiz", (req, res) => {
    res.render('quiz');
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
