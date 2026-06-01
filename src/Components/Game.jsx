import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./game.css";

const Game = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  const games = [
    {
      to: "/crossword",
      image: "/k.jpg",
      alt: "Crossword",
      description: "Solve constitutional clues one letter at a time.",
      title: "Constitution Quest",
    },
    {
      to: "/quiz",
      image: "/trivia.jpg",
      alt: "Trivia",
      description: "Test your Parliament and Constitution knowledge.",
      title: "Parliament Trivia",
    },
    {
      to: "/guess",
      image: "/memo1.jpg",
      alt: "Memory match",
      description: "Match Articles with their constitutional meaning.",
      title: "Memory Match",
    },
  ];

  return (
    <main className="games-page">
      <motion.video
        autoPlay
        loop
        muted
        playsInline
        className="back-video"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 1 } }}
      >
        <source src="/a.mp4" type="video/mp4" />
      </motion.video>

      <div className="containerx">
        <header className="games-header">
          <h1>Games</h1>
          <p>Play, learn, and revise the Constitution without getting stuck.</p>
        </header>
        <div className="card__container">
          {games.map((game) => (
            <Link to={game.to} key={game.to} className="game-card-link">
              <motion.article
                className="card__article"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
              >
                <img src={game.image} alt={game.alt} className="card__img" />
                <div className="card__data">
                  <span className="card__description">{game.description}</span>
                  <h2 className="card__title">{game.title}</h2>
                </div>
              </motion.article>
            </Link>
          ))}
          <Link to="/feature" className="game-card-link">
            <motion.article
              className="card__article"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
            >
              <img src="/s.jpg" alt="Learn more" className="card__img" />
              <div className="card__data">
                <span className="card__description">
                  Explore lessons before playing the next round.
                </span>
                <h2 className="card__title">Learn First</h2>
              </div>
            </motion.article>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Game;
