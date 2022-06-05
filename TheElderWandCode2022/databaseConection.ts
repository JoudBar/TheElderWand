const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const fetch = require("node-fetch");

// const uri =
//   "mongodb+srv://milanlaukens:tWmMVb%40ZrVKeg5D@cluster0.tjjs8.mongodb.net/the_one?retryWrites=true&w=majority";

const uri =
  "mongodb+srv://s130120:s130120@login.wqoqa.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

export interface DocChapter {
  _id: string;
  chapterName: string;
  book: string;
}

export interface chapter {
  docs: DocChapter[];
  total: number;
  limit: number;
  offset: number;
  page: number;
  pages: number;
}

///////////////////////////////////////////////////////////////

export interface DocCharacter {
  _id: string;
  height: string;
  race: string;
  gender: string;
  birth: string;
  spouse: string;
  death: string;
  realm: string;
  hair: string;
  name: string;
  wikiUrl: string;
}

export interface character {
  docs: DocCharacter[];
  total: number;
  limit: number;
  offset: number;
  page: number;
  pages: number;
}

//////////////////////////////////////////////////////////////

export interface DocMovie {
  _id: string;
  name: string;
  runtimeInMinutes: number;
  budgetInMillions: number;
  boxOfficeRevenueInMillions: number;
  academyAwardNominations: number;
  academyAwardWins: number;
  rottenTomatoesScore: number;
}

export interface movie {
  docs: DocMovie[];
  total: number;
  limit: number;
  offset: number;
  page: number;
  pages: number;
}

////////////////////////////////////////////////////////////////

interface DocQuote {
  _id: string;
  dialog: string;
  movie: string;
  character: string;
  id: string;
}

interface quote {
  docs: DocQuote[];
  total: number;
  limit: number;
  offset: number;
  page: number;
  pages: number;
}

interface person {
  _id?: number;
  name: string;
  age: number;
}

const chapters: chapter = require("./json/chapter.json");
const characters: character = require("./json/character.json");
const movies: movie = require("./json/movie.json");
const quotes: quote = require("./json/quote.json");
let API: any[] = [
  { chapters: chapters },
  { characters: characters },
  { movies: movies },
  { quotes: quotes },
];
let chaptersId = "629a2b47db66491bcef3b260";
let charactersId = "629a2b47db66491bcef3b261";
let moviesId = "629a2b47db66491bcef3b262";
let quoteId = "629a2b47db66491bcef3b263";

interface data {
  chapters?: chapter;
  characters?: character;
  movies?: movie;
  quotes?: quote;
}

let data: data[] = [];

const main = async (): Promise<data> => {
  let data: data;
  try {
    await client.connect();
    await fetch(
      client.db("IT-Project").collection("Api").find().sort({ _Id: 1 })
    );

    let charactersss = await fetch(
      client.db("IT-Project").collection("Api").findOne({ characters })
    );
    let characterss = await charactersss.json();

    let moviesss = await fetch(
      client.db("IT-Project").collection("Api").findOne({ movies })
    );
    let moviess;
    moviesss.then((data) => {
      let result = data.json();
      moviess = data;
    });

    let quotesss = await fetch(
      client.db("IT-Project").collection("Api").findOne({ quotes })
    );
    let quotess = await quotesss.json();

    return fetch(
      (data = {
        chapters: chapterss,
        characters: characterss,
        movies: moviess,
        quotes: quotess,
      })
    );
    // console.log(data);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
};

// let soortQuiz = req.query.soortQuiz;
//   let index = req.params.index

// let id: ObjectId = new ObjectId;
// let id2: ObjectId=  new ObjectId;
// switch (soortQuiz) {
//   case "chapters":
//     id = new ObjectId("629a5f009654083ef856dcbb");
//     break;
//   case "financial":
//     id = new ObjectId("629a5f009654083ef856dcbd");
//     break;
//   case "quote":
//     id = new ObjectId("629a5f009654083ef856dcbc");
//     id2 = new ObjectId("629a5f009654083ef856dcbe");
//     break;
//   default:
//     break;
// }

main().then(() => {
  console.log(data);
});

// try {
//   await client.connect();
//   await client
//     .db("IT-Project")
//     .collection("Api")
//     .find()
//     .sort()
//     .forEach((data: any) => alleData.push(data))
//     .then(() => {
//       console.log("complete");
//     })
//     .catch(() => {
//       res.status(500).json({ error: "kan de data niet vinden" });
//     });
// } catch (e) {
//   console.error(e);
// } finally {
//   await client.close();
// }
