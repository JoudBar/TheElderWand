

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

let movies: movie;

export interface FPagina {
  id: string;
  name?: string;
  vraag: string;
  opties: number[];
  juisteAntwoord: number;
}

interface minmax {
  (juisteNummer: number): number;
}
interface rbbaar {
  (id: string): number;
}
const min: minmax = (juisteNummer) => {
  let randomNummer: number;
  do {
    randomNummer = ff.randomNummerBetween(juisteNummer - 50, juisteNummer + 10);
  } while (juisteNummer == randomNummer);
  return randomNummer;
};
const max: minmax = (juisteNummer) => {
  let randomNummer: number;
  do {
    randomNummer = ff.randomNummerBetween(juisteNummer - 10, juisteNummer + 50);
  } while (juisteNummer == randomNummer);
  return randomNummer;
};
const mid: minmax = (juisteNummer) => {
  let randomNummer: number;
  do {
    randomNummer = ff.randomNummerBetween(juisteNummer - 50, juisteNummer + 50);
  } while (juisteNummer == randomNummer);
  return randomNummer;
};
const runtimeInMinutes: rbbaar = (id) => {
  let lengte = movies.docs.length;
  for (let i = 0; i < lengte; i++) {
    if (id == movies.docs[i]._id) {
      return movies.docs[i].runtimeInMinutes;
    }
  }
  return 404.404;
};
const budgetInMillions: rbbaar = (id) => {
  let lengte = movies.docs.length;
  for (let i = 0; i < lengte; i++) {
    if (id == movies.docs[i]._id) {
      return movies.docs[i].budgetInMillions;
    }
  }
  return 404.404;
};
const boxOfficeRevenueInMillions: rbbaar = (id) => {
  let lengte = movies.docs.length;
  for (let i = 0; i < lengte; i++) {
    if (id == movies.docs[i]._id) {
      return movies.docs[i].boxOfficeRevenueInMillions;
    }
  }
  return 404.404;
};
const academyAwardNominations: rbbaar = (id) => {
  let lengte = movies.docs.length;
  for (let i = 0; i < lengte; i++) {
    if (id == movies.docs[i]._id) {
      return movies.docs[i].academyAwardNominations;
    }
  }
  return 404.404;
};
const academyAwardWins: rbbaar = (id) => {
  let lengte = movies.docs.length;
  for (let i = 0; i < lengte; i++) {
    if (id == movies.docs[i]._id) {
      return movies.docs[i].academyAwardWins;
    }
  }
  return 404.404;
};
const rottenTomatoesScore: rbbaar = (id) => {
  let lengte = movies.docs.length;
  for (let i = 0; i < lengte; i++) {
    if (id == movies.docs[i]._id) {
      return movies.docs[i].rottenTomatoesScore;
    }
  }
  return 404.404;
};

const maakDeOpties = (juisteAntwoord: number, vraag: string): number[] => {
  let opties: number[] = [juisteAntwoord];
  let teller: number = 1;
  do {
    let optie: number = 9999;
    let random;
    switch (vraag) {
      case "Hoeveel minuten telde de fil":
        random = ff.random(3) + 1;
        switch (random) {
          case 1:
            optie = min(juisteAntwoord);
            break;
          case 2:
            optie = max(juisteAntwoord);
            break;
          case 3:
            optie = mid(juisteAntwoord);
            break;

          default:
            break;
        }
        break;
      case "Hoeveel was het budget voor deze film":
        random = ff.random(3) + 1;
        switch (random) {
          case 1:
            optie = min(juisteAntwoord);
            break;
          case 2:
            optie = max(juisteAntwoord);
            break;
          case 3:
            optie = mid(juisteAntwoord);
            break;

          default:
            break;
        }
        break;
      case "Hoeveel was de boxofficerevenue in Milljoenen voor deze film":
        random = ff.random(3) + 1;
        switch (random) {
          case 1:
            optie = min(juisteAntwoord);
            break;
          case 2:
            optie = max(juisteAntwoord);
            break;
          case 3:
            optie = mid(juisteAntwoord);
            break;

          default:
            break;
        }
        break;
      case "Hoeveel academy award nominations kreeg deze film":
        optie = ff.random(30);
        break;
      case "hoeveel academy award wins kreeg deze film":
        optie = ff.random(20);
        break;
      case "Welke rottenTomatoesScore kreeg deze film":
        optie = ff.randomNummerBetween(60, 100);
        break;

      default:
        break;
    }
    let gaDoor: boolean = true;
    for (let i = 0; i < opties.length; i++) {
      if (optie == opties[i] || optie == 9999) {
        gaDoor = false;
      }
    }
    if (gaDoor == true) {
      opties[teller] = optie;
      teller++;
    }
  } while (opties[3] == undefined);
  opties = ff.shuffle(opties);
  return opties;
};
export const ff = {
  random: (number: number) => {
    return Math.floor(Math.random() * (number - 1 + 1));
  },
  
  shuffle: (arr: number[]): number[] => {
    let shufArr: number[] = [];
    let spotsTaken: number[] = [];
    do {
      let continu = true;
      let ran = ff.random(arr.length);
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
  
  randomNummerBetween: (min: number, max: number) => {
    max++;
    return Math.floor(Math.random() * (max - min)) + min;
  },
  juisteAntwoordId: () => {
    let id = movies.docs[ff.random(8)]._id;
    if (id == undefined) {
      console.log(1);
      return " error";
    }
    return id;
  },
  juisteAntwoordName: (juisteAntwoordId: string) => {
    let lengte = movies.docs.length;
    for (let i = 0; i < lengte; i++) {
      if (juisteAntwoordId == movies.docs[i]._id) {
        return movies.docs[i].name;
      }
    }
  },
  maakDePaginas: (leng: number, data: movie): FPagina[] => {
    movies = data;
    console.log("lol");
    let paginas: FPagina[] = [];
    do {
      let continu: boolean = true;
      let juisteAntwoordId = ff.juisteAntwoordId();
      let name = ff.juisteAntwoordName(juisteAntwoordId);
      let random = ff.random(6);
      let juisteAntwoord;
      let vraag;
      console.log(0);
      switch (random) {
        case 0:
          vraag = "Hoeveel minuten telde de fil";
          juisteAntwoord = runtimeInMinutes(juisteAntwoordId);

          break;
        case 1:
          vraag = "Hoeveel was het budget voor deze film";
          juisteAntwoord = budgetInMillions(juisteAntwoordId);

          break;
        case 2:
          vraag =
            "Hoeveel was de boxofficerevenue in Milljoenen voor deze film";
          juisteAntwoord = boxOfficeRevenueInMillions(juisteAntwoordId);

          break;
        case 3:
          vraag = "Hoeveel academy award nominations kreeg deze film";
          juisteAntwoord = academyAwardNominations(juisteAntwoordId);

          break;
        case 4:
          vraag = "hoeveel academy award wins kreeg deze film";
          juisteAntwoord = academyAwardWins(juisteAntwoordId);

          break;
        case 5:
          vraag = "Welke rottenTomatoesScore kreeg deze film";
          juisteAntwoord = rottenTomatoesScore(juisteAntwoordId);

          break;

        default:
          vraag = "error";
          juisteAntwoord = 9999;
          break;
      }
      console.log(0.5);
      let opties: number[] = maakDeOpties(juisteAntwoord, vraag);
      console.log(0.5);
      for (let i = 0; i < paginas.length; i++) {
        if (vraag == paginas[i].vraag && juisteAntwoordId == paginas[i].id) {
          continu = false;
        }
      }
      console.log(1);
      if (continu == true) {
        paginas.push({
          id: juisteAntwoordId,
          juisteAntwoord: juisteAntwoord,
          name: name,
          opties: opties,
          vraag: vraag,
        });
      }
    } while (paginas.length != leng);
    console.log(2);
    return paginas;
  },

};


