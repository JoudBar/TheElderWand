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

const chapters: chapter = require("./json/chapter.json");
const characters: character = require("./json/character.json");
const movies: movie = require("./json/movie.json");
const quotes: quote = require("./json/quote.json");
/*                                      [DATA]                                      */
//////////////////////////////////////////////////////////////////////////////////////
//
//
//
//////////////////////////////////////////////////////////////////////////////////////
/*                                     [VARIABELE]                                  */
let juisteAntwoord: string = "";
let antwoorden: string[] = [" ", " ", " "];
let juisteAntwoordId: string = "";
/*                                     [VARIABELE]                                  */
//////////////////////////////////////////////////////////////////////////////////////
//
//
//
//////////////////////////////////////////////////////////////////////////////////////
/*                                      [FUNCTIES]                                  */
const random = (number: number) => {
  return Math.floor(Math.random() * (number + 1));
};

const zoekId = (persoon: string): string => {
  let id = "";
  for (let i = 0; i < characters.docs.length; i++) {
    let result = characters.docs[i].name;
    if (persoon == result) {
      id = characters.docs[i]._id;
    }
  }
  return id;
};
const zoekCharacter = (id: string): string => {
  let character = "";
  for (let i = 0; i < characters.docs.length; i++) {
    let result = characters.docs[i]._id;
    if (id == result) {
      character = characters.docs[i].name;
    }
  }
  return character;
};

const juisteAntwoordInOpties = (
  juisteAntwoord: string,
  antwoord: string
): boolean => {
  if (juisteAntwoord == antwoord) {
    return true;
  }
  return false;
};

const shuffle = (array: string[]): string[] => {
  let gedaan: Boolean = true;
  let newArray: string[] = Array(array.length);
  let volgorde: number[] = Array(array.length);
  let e = -1;

  while (gedaan == true) {
    let o = true;
    let randomGetal = random(2) + 1;
    for (let i = 0; i < volgorde.length; i++) {
      if (randomGetal == volgorde[i]) {
        o = false;
      }
    }
    if (o == true) {
      volgorde[e] = randomGetal;
      e++;
    }
    if (volgorde[volgorde.length - 1] != undefined) {
      gedaan = false;
    }
  }
  for (let i = 0; i < volgorde.length; i++) {
    newArray[volgorde[i]] = array[i];
  }
  return newArray;
};

const checkOfDeCharacterEenQuoteHeeft = (persoon: string) => {
  let opnieuw: boolean = true;
  let id: string = zoekId(persoon);
  let gevonden = "y";
  let redo;
  let finished: number = quotes.docs.length - 1;
  let teller = 0;
  while (opnieuw == true) {
    gevonden = "y";
    if (id == quotes.docs[teller].character) {
      juisteAntwoordId = id;
      juisteAntwoord = zoekCharacter(juisteAntwoordId);
      opnieuw = false;
      gevonden = "y";
    } else if (teller == finished) {
      gevonden = "n";
    }
    if (gevonden == "n") {
      redo = characters.docs[random(characters.docs.length) - 1].name;

      id = zoekId(redo);
      juisteAntwoord = redo;
      teller = -1;
    }
    teller++;
  }
};
/*                                      [FUNCTIES]                                  */
//////////////////////////////////////////////////////////////////////////////////////
//
//
//
//////////////////////////////////////////////////////////////////////////////////////
/*                                        [FIELD]                                   */
// POTENTIEL juist antwoord word gegenereerd
// juisteAntwoord = characters.docs[random(characters.docs.length)].name;
// juisteAntwoord = zoekCharacter(quotes.docs[random(quotes.docs.length)]._id);
// juisteAntwoordId = zoekId(juisteAntwoord);
// console.log(juisteAntwoord);
// console.log(juisteAntwoordId);

//genereer het antwoord
checkOfDeCharacterEenQuoteHeeft(juisteAntwoord);
////////////////////////////////////////////////

antwoorden[0] = juisteAntwoord;
let foutAntwoord: string = " ";
let r: number = 2;
let z: number = 1;
for (let i = 0; i < r; i++) {
  foutAntwoord = characters.docs[random(characters.docs.length) - 1].name;
  if (foutAntwoord == juisteAntwoord) {
    r++;
  } else {
    antwoorden[z] = foutAntwoord;
    z++;
  }
}

console.log(antwoorden);

console.log(juisteAntwoord);
console.log(juisteAntwoordId);

console.log(shuffle(antwoorden));

const shuffledDeck = shuffle(antwoorden);
console.log(shuffledDeck);
console.log(shuffledDeck.length);
/*                                        [FIELD]                                   */
//////////////////////////////////////////////////////////////////////////////////////
//
//
//
const express = require("express");
const ejs = require("ejs");

const app = express();
app.set("view engine", "ejs");
app.set("port", 3000);
app.use(express.static("assets"));

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/faq", (req: any, res: any) => {
  res.render("faq");
});

app.get("/quize", (req: any, res: any) => {
  res.render("quize");
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
