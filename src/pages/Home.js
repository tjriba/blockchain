import React from 'react';
import { Link } from 'react-router-dom';
import BlockchainInfo from '../components/BlockchainInfo';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        {/* Header */}
        <div className="home-header">
          <div className="header-glow"></div>
          <h1 className="home-title">
            <span className="title-main">Projet de Fin de Module</span>
            <span className="title-accent">dApp</span>
          </h1>
          <p className="home-subtitle">
            Développement d'une dApp pour le TP 3
          </p>
          <div className="tech-badges">
            {['Solidity', 'Truffle', 'ReactJS'].map((tech) => (
              <span key={tech} className="tech-badge">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Blockchain Info - Added this section */}
        <div className="blockchain-section">
          <BlockchainInfo />
        </div>

        {/* Exercises Grid */}
        <div className="exercises-grid">
          {exercises.map((exercise) => (
            <ExerciseCard 
              key={exercise.number}
              number={exercise.number}
              title={exercise.title}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="home-footer">
          Sélectionnez un exercice pour commencer
        </div>
      </div>
    </div>
  );
};

const ExerciseCard = ({ number, title }) => {
  return (
    <Link 
      to={`/exercise${number}`}
      className="exercise-card"
    >
      <div className="exercise-card-content">
        <div className="exercise-number">
          <span>
            {number}
          </span>
        </div>
        <div className="exercise-info">
          <h3 className="exercise-title">
            {title}
          </h3>
        </div>
        <svg className="exercise-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </div>
    </Link>
  );
};

const exercises = [
  { number: 1, title: "Somme de deux variables" },
  { number: 2, title: "Conversion des cryptomonnaies" },
  { number: 3, title: "Titrement des chaînes de caractères" },
  { number: 4, title: "Tester le signe d'un nombre" },
  { number: 5, title: "Tester la parité d'un nombre" },
  { number: 6, title: "Gestion des tableaux" },
  { number: 7, title: "Programmation Orientée Objet" },
  { number: 8, title: "Variables globales (msg.sender, msg.value)" }
];

export default Home;