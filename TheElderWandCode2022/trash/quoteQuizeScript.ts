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
let quote: string = "";
let juisteAntwoord: string = "";
let opties: string[];
let juisteAntwoordId: string = "";
/*                                     [VARIABELE]                                  */
//////////////////////////////////////////////////////////////////////////////////////
//
//
//
//////////////////////////////////////////////////////////////////////////////////////
/*                                      [FUNCTIES]                                  */

const random = (number: number) => {
  return Math.floor(Math.random() * (number - 1 + 1));
};

const zoekIdQuote = (quote: string): string => {
  let id = "";
  for (let i = 0; i < quotes.docs.length; i++) {
    let result = quotes.docs[i].dialog;
    if (quote == result) {
      id = quotes.docs[i].character;
    }
  }
  return id;
};
const zoekIdPersoon = (persoon: string): string => {
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

const shuffle = (arr: string[]): string[] => {
  let shufArr: string[] = [];
  let spotsTaken: number[] = [];
  do {
    let continu = true;
    let ran = random(arr.length);
    for (let i = 0; i < arr.length; i++) {
      if (ran == spotsTaken[i]) {
        continu = false;
      }
    }
    if (continu == true) {
      shufArr.push(arr[ran]);
      spotsTaken.push(ran);
    }
  } while (shufArr.length != arr.length);
  return shufArr;
};

const checkOfDeCharacterEenQuoteHeeft = (): string => {
  let persoon = characters.docs[random(characters.docs.length)].name;
  let opnieuw: boolean = true;
  let id: string = zoekIdPersoon(persoon);
  let gevonden = "y";
  let redo;
  let finished: number = quotes.docs.length - 1;
  let teller = 0;
  let characterMetQuoteId: string;
  let characterMetQuote: string = "";
  while (opnieuw == true) {
    gevonden = "y";
    if (id == quotes.docs[teller].character) {
      characterMetQuoteId = id;
      characterMetQuote = zoekCharacter(characterMetQuoteId);
      opnieuw = false;
      gevonden = "y";
    } else if (teller == finished) {
      gevonden = "n";
    }
    if (gevonden == "n") {
      redo = characters.docs[random(characters.docs.length)].name;

      id = zoekIdPersoon(redo);
      characterMetQuote = redo;
      teller = -1;
    }
    teller++;
  }
  return characterMetQuote;
};

const maakDeOpties = (lengte: number): string[] => {
  quote = quotes.docs[random(quotes.docs.length)].dialog;
  juisteAntwoordId = zoekIdQuote(quote);
  juisteAntwoord = zoekCharacter(juisteAntwoordId);
  let done = true;
  let teller = 0;
  let opties: string[] = Array(lengte);
  while (done == true) {
    let characterMetQuote = checkOfDeCharacterEenQuoteHeeft();
    if (teller == 0) {
      opties[teller] = juisteAntwoord;
      teller++;
    } else if (zoekIdPersoon(characterMetQuote) == juisteAntwoord) {
    } else {
      opties[teller] = characterMetQuote;
      teller++;
    }

    if (teller == lengte) {
      done = false;
    }
  }
  console.log(opties);
  opties = shuffle(opties);
  return opties;
};

/*                                      [FUNCTIES]                                  */
//////////////////////////////////////////////////////////////////////////////////////
//
//
//
//////////////////////////////////////////////////////////////////////////////////////
/*                                        [FIELD]                                   */

opties = maakDeOpties(3);

console.log(`de quote: `);
console.log(quote);
console.log(`---------------------------------------------`);
console.log(`de opties: `);
console.log(opties);
console.log(`---------------------------------------------`);
console.log(`het juiste antwoord: `);
console.log(juisteAntwoord);
console.log(`---------------------------------------------`);
console.log(`het id van het juiste antwoord `);
console.log(juisteAntwoordId);

// let foutAntwoord: string = " ";
// let r: number = 2;
// let z: number = 1;
// for (let i = 0; i < r; i++) {
//   foutAntwoord = characters.docs[random(characters.docs.length) - 1].name;
//   if (foutAntwoord == juisteAntwoord) {
//     r++;
//   } else {
//     antwoorden[z] = foutAntwoord;
//     z++;
//   }
// }

// console.log(antwoorden);

// console.log(juisteAntwoord);
// console.log(juisteAntwoordId);

// console.log(shuffle(antwoorden));

// const shuffledDeck = shuffle(antwoorden);
// console.log(shuffledDeck);
// console.log(shuffledDeck.length);
/*                                        [FIELD]                                   */
//////////////////////////////////////////////////////////////////////////////////////
