import { useState } from "react";

import { MovieView } from "../movie-view/movie-view";

import { MovieCard } from "../movie-card/movie-card";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "V for Vendetta",
      description:
        "V for Vendetta is based on the 1988 DC Vertigo Comics limited series of the same title by Alan Moore, David Lloyd, and Tony Weare. The film, set in a future where a fascist totalitarian regime has subjugated the UK, centres on V (portrayed by Hugo Weaving), an anarchist and masked freedom-fighter who attempts to ignite a revolution through elaborate terrorist acts, and on Evey Hammond (portrayed by Natalie Portman) a young woman caught up in V's mission. Stephen Rea portrays a detective leading a desperate quest to stop V.",
      director: [
        {
          name: "Tom Tykwer",
          bio:
            "Tom Tykwer (born 23 May 1965) is a German film director, producer, screenwriter, and composer. He is best known internationally for directing the thriller films Run Lola Run (1998), Heaven (2002), Perfume: The Story of a Murderer (2006), and The International (2009). He collaborated with The Wachowskis as co-director for the science fiction film Cloud Atlas (2012) and the Netflix series Sense8 (2015–2018), and worked on the score for Lana Wachowski's The Matrix Resurrections (2021). Tykwer is also well known as the co-creator of the internationally acclaimed German television series Babylon Berlin (2017–). Tykwer was born in Wuppertal, West Germany. Fascinated by film from an early age, he started making amateur Super 8 films at the age of eleven. He later helped out at a local arthouse cinema in order to see more films, including those for which he was too young to buy tickets. After graduating from high school, he applied to numerous film schools around Europe, unsuccessfully.",
          birthyear: "1965-05-23",
          deathyear: ""
        }
      ],
      genre: {
        name: "Drama",
        description:
          "Drama is a genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone, focusing on in-depth development of realistic characters who must deal with realistic emotional struggles."
      },
      imageurl:
        "https://m.media-amazon.com/images/M/MV5BOTI5ODc3NzExNV5BMl5BanBnXkFtZTcwNzYxNzQzMw@@.jpg",
      featured: true
    },
    {
      id: 2,
      title: "The Dark Knight",
      description:
        "The Dark Knight is a 2008 superhero film directed by Christopher Nolan from a screenplay co-written with his brother Jonathan. Based on the DC Comics superhero, Batman, it is the sequel to Batman Begins (2005) and the second installment in The Dark Knight Trilogy. The plot follows the vigilante Batman, police lieutenant James Gordon, and district attorney Harvey Dent, who form an alliance to dismantle organized crime in Gotham City. Their efforts are derailed by the Joker, an anarchistic mastermind who seeks to test how far Batman will go to save the city from chaos. The ensemble cast includes Christian Bale, Michael Caine, Heath Ledger, Gary Oldman, Aaron Eckhart, Maggie Gyllenhaal, and Morgan Freeman.",
      director: [
        {
          name: "Christopher Nolan",
          bio:
            "Christopher Edward Nolan was born on 30 July 1970, in Westminster, London is a British and American filmmaker and screenwriter. His father, Brendan, was a British advertising executive who worked as a creative director. His mother, Christina, was an American flight attendant from Evanston, Illinois; she would later work as a teacher of English. He has an elder brother, Matthew, and a younger brother, Jonathan, also a filmmaker. Christopher Nolan is Known for his Hollywood blockbusters with complex storytelling, Nolan is considered a leading filmmaker of the 21st century. His films have grossed $5 billion worldwide. The recipient of many accolades, he has been nominated for five Academy Awards, five BAFTA Awards and six Golden Globe Awards. In 2015, he was listed as one of the 100 most influential people in the world by Time, and in 2019, he was appointed Commander of the Order of the British Empire for his contributions to film.",
          birthyear: "1970-07-30",
          deathyear: ""
        }
      ],
      genre: {
        name: "Thriller",
        description:
          "A thriller is a story that is usually a mix of fear and excitement. It has traits from the suspense genre and often from the action, adventure or mystery genres, but the level of terror makes it borderline horror fiction at times as well. It generally has a dark or serious theme, which also makes it similar to drama."
      },
      imageurl:
        "https://m.media-amazon.com/images/M/MV5BNDkwNTgzMjEtMGMxMi00OGVmLTg3ZWItNDJlOGU5ODEyYzUzXkEyXkFqcGdeQXVyNjAwNDUxODI@.jpg",
      featured: true
    },
    {
      id: 3,
      title: "Joker",
      description:
        "Joker is a 2019 American psychological thriller superhero film directed by Todd Phillips, who also co-wrote the screenplay with Scott Silver. The film, based on DC Comics characters, stars Joaquin Phoenix as Joker and serves as a standalone origin story for the character. Set in 1981, it follows Arthur Fleck, a failed clown and aspiring stand-up comic whose descent into mental illness and nihilism inspires a violent countercultural revolution against the wealthy in a decaying Gotham City.",
      director: [
        {
          name: "Todd Phillips",
          bio:
            "Todd Phillips ( born December 20, 1970) is an American film director, producer, and screenwriter. Phillips was born in Brooklyn, New York City, to a Jewish family. He was raised in Dix Hills, New York, on Long Island. He attended New York University Film School, but dropped out because he could not afford to complete his first film and pay tuition simultaneously. Around that time, he worked at Kim's Video and Music. He began his career in 1993 and directed films in the 2000s such as Road Trip, Old School, Starsky & Hutch, and School for Scoundrels. He came to wider prominence in the early 2010s for directing The Hangover film series.",
          birthyear: "1970-12-20",
          deathyear: ""
        }
      ],
      genre: {
        name: "Thriller",
        description:
          "A thriller is a story that is usually a mix of fear and excitement. It has traits from the suspense genre and often from the action, adventure or mystery genres, but the level of terror makes it borderline horror fiction at times as well. It generally has a dark or serious theme, which also makes it similar to drama."
      },
      imageurl:
        "https://m.media-amazon.com/images/M/MV5BYmE3ZGJlNzYtMzgyZS00NTQ0LThmN2YtOWQyOThjOTFhZjRlXkEyXkFqcGdeQXVyMTA5OTc4NTkz..jpg",
      featured: true
    }
  ]);

  const [selectedMovie, setselectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView
        movieView={selectedMovie}
        onBackClick={() => setselectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div> The movie list empty. </div>;
  } else {
    return (
      <div>
        {movies.map((movie) => {
          return (
            <MovieCard
              key={movie.id}
              movieCard={movie}
              onMovieClick={(newselectedMovie) => {
                setselectedMovie(newselectedMovie);
              }}
            />
          );
        })}
      </div>
    );
  }
};
