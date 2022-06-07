
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

let characters: character;

let quotes: quote;

export interface quotePagina {
  quote: string;
  opties: string[];
  juisteAntwoord: string;
  juisteAntwoordId: string;
}

export const qf = {
  random: (number: number) => {
    return Math.floor(Math.random() * (number - 1 + 1));
  },

  zoekIdQuote: (quote: string): string => {
    let id = "";
    for (let i = 0; i < quotes.docs.length; i++) {
      let result = quotes.docs[i].dialog;
      if (quote == result) {
        id = quotes.docs[i].character;
      }
    }
    return id;
  },
  zoekIdPersoon: (persoon: string): string => {
    let id = "";
    for (let i = 0; i < characters.docs.length; i++) {
      let result = characters.docs[i].name;
      if (persoon == result) {
        id = characters.docs[i]._id;
      }
    }
    return id;
  },
  zoekCharacter: (id: string): string => {
    let character = "";
    for (let i = 0; i < characters.docs.length; i++) {
      let result = characters.docs[i]._id;
      if (id == result) {
        character = characters.docs[i].name;
      }
    }
    return character;
  },

  shuffle: (arr: string[]): string[] => {
    let shufArr: string[] = [];
    let spotsTaken: number[] = [];
    do {
      let continu = true;
      let ran = qf.random(arr.length);
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
  },

  checkOfDeCharacterEenQuoteHeeft: (): string => {
    let persoon = characters.docs[qf.random(characters.docs.length)].name;
    let opnieuw: boolean = true;
    let id: string = qf.zoekIdPersoon(persoon);
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
        characterMetQuote = qf.zoekCharacter(characterMetQuoteId);
        opnieuw = false;
        gevonden = "y";
      } else if (teller == finished) {
        gevonden = "n";
      }
      if (gevonden == "n") {
        redo = characters.docs[qf.random(characters.docs.length)].name;

        id = qf.zoekIdPersoon(redo);
        characterMetQuote = redo;
        teller = -1;
      }
      teller++;
    }
    return characterMetQuote;
  },

  quote: (): string => {
    return quotes.docs[qf.random(quotes.docs.length)].dialog;
  },

  juistAntwoordId: (quote: string): string => {
    return qf.zoekIdQuote(quote);
  },

  juisteAntwoord: (juistAntwoordId: string): string => {
    return qf.zoekCharacter(juistAntwoordId);
  },

  maakDeOpties: (juisteAntwoord: string, lengte: number): string[] => {
    let done = true;
    let teller = 0;
    let opties: string[] = Array(lengte);
    while (done == true) {
      let stop: boolean = true;
      let characterMetQuote = qf.checkOfDeCharacterEenQuoteHeeft();
      for (let i = 0; i < opties.length; i++) {
        if (
          qf.zoekIdPersoon(characterMetQuote) == qf.zoekIdPersoon(opties[i])
        ) {
          stop = false;
        }
      }
      if (teller == 0) {
        opties[teller] = juisteAntwoord;
        teller++;
      } else if (
        qf.zoekIdPersoon(characterMetQuote) ==
          qf.zoekIdPersoon(juisteAntwoord) ||
        stop == false
      ) {
      } else {
        opties[teller] = characterMetQuote;
        teller++;
      }

      if (teller == lengte) {
        done = false;
      }
    }
    opties = qf.shuffle(opties);
    return opties;
  },
  filInPage: (quote: string, aantalOpties: number = 3): quotePagina => {
    let pagina: quotePagina = {
      quote: "",
      juisteAntwoord: "",
      juisteAntwoordId: "",
      opties: [],
    };
    pagina.quote = quote;
    pagina.juisteAntwoordId = qf.juistAntwoordId(pagina.quote);
    pagina.juisteAntwoord = qf.juisteAntwoord(pagina.juisteAntwoordId);
    pagina.opties = qf.maakDeOpties(pagina.juisteAntwoord, aantalOpties);
    return pagina;
  },
  maakDePaginas: (
    aantal: number,
    dataQuo: quote,
    dataChar: character
  ): quotePagina[] => {
    quotes = dataQuo;
    characters = dataChar;
    let teller: number = 0;
    let paginas: quotePagina[] = [];
    let pagina: quotePagina;
    do {
      let quote = qf.quote();
      let skip = false;
      for (let i = 0; i < paginas.length; i++) {
        if (quote == paginas[i].quote) {
          skip = true;
        }
      }
      if (skip == false) {
        paginas[teller] = qf.filInPage(quote);
        teller++;
      }
    } while (teller != aantal);
    return paginas;
  },
};
