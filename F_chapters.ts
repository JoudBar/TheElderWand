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

export interface CPagina {
  chapter: string;
  id: string;
  juisteAntwoord: string;
}

let chapters: chapter;

export const cf = {
  random: (number: number): number => {
    return Math.floor(Math.random() * (number - 1 + 1));
  },
  randomChapter: (): string => {
    chapters.docs;
    return chapters.docs[cf.random(chapters.docs.length)].chapterName;
  },
  randomChaperId: (chapter: string): string => {
    for (let i = 0; i < chapters.docs.length; i++) {
      if (chapters.docs[i].chapterName == chapter) {
        return chapters.docs[i]._id;
      }
    }
    return "error";
  },
  randomChaperBook: (chapter: string): string => {
    for (let i = 0; i < chapters.docs.length; i++) {
      if (chapters.docs[i].chapterName == chapter) {
        return chapters.docs[i].book;
      }
    }
    return "error";
  },

  maakDePaginas: (lengte: number, data: chapter): CPagina[] => {
    chapters = data;
    let paginas: CPagina[] = [];

    let pagina: CPagina;
    do {
      let done = true;

      do {
        let randomChaper = cf.randomChapter();
        let randomChaperId = cf.randomChaperId(randomChaper);
        let randomChaperBook = cf.randomChaperBook(randomChaper);

        if (paginas.length == 0) {
          pagina = {
            chapter: randomChaper,
            id: randomChaperId,
            juisteAntwoord: randomChaperBook,
          };
          paginas.push(pagina);
        } else {
          let stop = false;
          for (let i = 0; i < paginas.length; i++) {
            if (randomChaper == paginas[i].chapter) {
              stop = true;
            }
          }
          if (stop == true) {
          } else {
            done = false;
            pagina = {
              chapter: randomChaper,
              id: randomChaperId,
              juisteAntwoord: randomChaperBook,
            };
            paginas.push(pagina);
          }
        }
      } while (done);
    } while (paginas[lengte - 1] == undefined);
    return paginas;
  },
};
