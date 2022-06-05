const ejs = require("ejs");
const express = require("express");
const bcrypt = require("bcrypt");
const session = require("express-session");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
// import { MongoClient,ObjectId } from "mongodb";
import { ObjectId } from "mongodb";

const { MongoClient, ServerApiVersion } = require("mongodb");
// const fetch = require("node-fetch");

// const uri =
//   "mongodb+srv://milanlaukens:tWmMVb%40ZrVKeg5D@cluster0.tjjs8.mongodb.net/the_one?retryWrites=true&w=majority";

const uri =
  "mongodb+srv://s130120:s130120@login.wqoqa.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  // serverApi: ServerApiVersion.v1,
});

//////////////////////////////////////////////////////////////////////////////////////
/*                                     [IMPORTS]                                  */
import { qf } from "./F_quotequize";
import { quotePagina } from "./F_quotequize";
import { cf } from "./F_chapters";
import { CPagina } from "./F_chapters";
import { ff } from "./F_financialquiz";
import { FPagina } from "./F_financialquiz";

/*                                     [IMPORTS]                                  */
//////////////////////////////////////////////////////////////////////////////////////
//
//
//
//////////////////////////////////////////////////////////////////////////////////////
/*                                        [FIELD]                                   */

/*                                        [FIELD]                                   */
//////////////////////////////////////////////////////////////////////////////////////

const app = express();
app.set("view engine", "ejs");
app.set("port", 3000);
app.use(express.static("assets"));

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/faq", (req: any, res: any) => {
  res.render("faq");
});

interface Person {
  _id?: ObjectId;
  name: string;
  email: string;
  password: string;
}

let lengte: number = 0;

let username: string;
let start: boolean;
let index: number = 0;
let alleData: any[] = [];
let paginas: CPagina[] | FPagina[] | quotePagina[];
let soortQuiz: string = "";
let punten: number = 0;
let score = `${punten}/${lengte}`;

app.get("/contact", (req: any, res: any) => {
  res.render("contact");
});
app.post("/contact", (req: any, res: any) => {
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
    service: "outlook",
    auth: {
      user: "theelderwandtheone@outlook.com",
      pass: "Theone1.",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  console.log(3);

  const mailOptions = {
    from: "TheOne",
    to: "theelderwandtheone@outlook.com",
    subject: "Node contact request",
    text: "hello world",
    html: output,
  };
  console.log(4);

  transporter.sendMail(mailOptions, (error: any, info: any) => {
    console.log(5);
    if (error) {
      res.send("error");
      console.log(6);
    } else {
      console.log("email sent: " + info.response);
      res.send(
        "We hebben uw bericht goed ontvangen, we zullen zo snel mogelijk reageren op uw vragen!"
      );
    }
  });
});

app.post(`/check`, (req: any, res: any) => {
  let antwoord = req.body.awnser;

  console.log(antwoord);
  console.log(paginas[index].juisteAntwoord);
  if (antwoord == paginas[index].juisteAntwoord) {
    console.log("juist");
    punten++;
    score = `${punten}/${lengte}`;
    index++;
    res.redirect("/quiz/juist");
  } else {
    console.log("fout");
    score = `${punten}/${lengte}`;
    index++;
    res.redirect("quiz/fout");
  }
});

app.get("/register", (req: any, res: any) => {
  res.render("register");
});

app.post("/register", async (req: any, res: any) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await client.connect();
    let UsersCollectien = client.db("IT-Project").collection("Users");

    await UsersCollectien.insertOne({
      id: ObjectId,
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    let user = await UsersCollectien.find({}).toArray();
    res.redirect("/login");
  } catch (e) {
    console.error(e);
  } finally {
    client.close();
  }
});

app.get("/login", (req: any, res: any) => {
  res.render("login.ejs");
});

app.post("/login", async (req: any, res: any) => {
  await client.connect();

  let UsersCollectien = client.db("IT-Project").collection("Users");

  let user = await client
    .db("IT-Project")
    .collection("Users")
    .findOne({ email: `${req.body.email}` });
  console.log(1);
  if (user == null) {
    console.log(2);
    return res.status(404).send("Cannot find user");
  }
  console.log(3);
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.redirect("/");
    } else {
      res.send("Password incorrect");
    }
  } catch {
    res.status(400).send("Cannot find user");
  } finally {
    client.close();
  }
});

app.post("/logout", (req: any, res: any) => {
  req.body.user = null;
  res.render("login");
});

app.post("/nextQuestion", (req: any, res: any) => {
  console.log(index);
  console.log(lengte);
  console.log("-------------------");
  if (index == lengte) {
    return res.redirect("/quiz/finished");
  }
  res.redirect(`/quize/${soortQuiz}?index=${index}`);
});

app.post("/startQuiz", (req: any, res: any) => {
  index = 0;
  paginas = [];
  punten = 0;
  username = req.body.username;
  lengte = parseInt(req.body.lengte);
  soortQuiz = req.body.soortQuiz;
  console.log(username);
  console.log(lengte);
  console.log(soortQuiz);

  start = true;
  res.redirect(`/quize/${soortQuiz}?index=${index}`);
});
// interface paginas

app.get("/quiz/juist", (req: any, res: any) => {
  res.render("A-juist", { score: score });
});
app.get("/quiz/fout", (req: any, res: any) => {
  res.render("A-fout", { score: score });
});

app.get("/quiz/finished", (req: any, res: any) => {
  res.render("score", { score: score });
});

app.get("/quize/:soortQuiz", async (req: any, res: any) => {
  let soortQuiz = req.params.soortQuiz;
  index = req.query.index;
  if (start == true) {
    try {
      await client.connect();
      await client
        .db("IT-Project")
        .collection("Api")
        .find()
        .sort()
        .forEach((data: any) => alleData.push(data))
        .then(() => {
          console.log("complete");
        })
        .catch(() => {
          res.status(500).json({ error: "kan de data niet vinden" });
        });
    } catch (e) {
      console.error(e);
    } finally {
      await client.close();
    }
  }
  console.log(alleData);
  let chapters = alleData[0].chapters;
  let characters = alleData[1].characters;
  let movies = alleData[2].movies;
  let quotes = alleData[3].quotes;

  if (start) {
  }
  switch (soortQuiz) {
    case "chapter":
      if (start == true) {
        paginas = cf.maakDePaginas(lengte, chapters);
        start = false;
      }
      console.log(paginas);

      res.render("quizChapter", {
        index: index,
        paginas: paginas,
        username: username,
      });
      break;
    case "financial":
      if (start == true) {
        paginas = ff.maakDePaginas(lengte, movies);
        start = false;
      }
      console.log(paginas);
      res.render("quizFinancial", {
        index: index,
        paginas: paginas,
        username: username,
      });
      break;
    case "quote":
      if (start == true) {
        paginas = qf.maakDePaginas(lengte, quotes, characters);
        start = false;
      }
      console.log(paginas);

      res.render("quizQuote", {
        index: index,
        paginas: paginas,
        username: username,
      });
      break;

    default:
      console.log(soortQuiz);
      res.render("TheOne");
      break;
  }

  // res.render("quiz", { index: index });
});

app.get("/startquiz", (req: any, res: any) => {
  res.render("startQuiz");
});

app.get("/personages", (req: any, res: any) => {
  res.render("personages");
});

app.get("/inloggen", (req: any, res: any) => {
  res.render("inloggen");
});

app.get("/contact", (req: any, res: any) => {
  res.render("contact");
});

app.get("/catalogus", (req: any, res: any) => {
  res.render("catalogus");
});
app.get("/account-aanmaken", (req: any, res: any) => {
  res.render("account-aanmaken");
});

app.get("/", (req: any, res: any) => {
  res.render("TheOne");
});

app.listen(app.get("port"), () =>
  console.log("[server] http://localhost:" + app.get("port"))
);
