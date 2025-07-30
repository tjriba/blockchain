import React from 'react';
import { Link } from 'react-router-dom';
import BlockchainInfo from '../components/BlockchainInfo';

const Home = () => {
  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #1e293b 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '56rem',
        backgroundColor: 'rgba(31, 41, 55, 0.8)',
        backdropFilter: 'blur(10px)',
        borderRadius: '1rem',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(to right, #2563eb, #7c3aed)',
          padding: '1.5rem',
          textAlign: 'center'
        }}>
          <h1 style={{ 
            fontSize: '1.875rem',
            fontWeight: '700',
            color: 'white',
            margin: 0
          }}>Projet de Fin de Module</h1>
          <p style={{ 
            color: '#bfdbfe', 
            marginTop: '0.5rem',
            marginBottom: 0
          }}>
            Développement d'une dApp pour le TP 3
          </p>
          <div style={{ 
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            marginTop: '0.75rem'
          }}>
            {['Solidity', 'Truffle', 'ReactJS'].map((tech) => (
              <span key={tech} style={{
                padding: '0.25rem 0.75rem',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontFamily: 'monospace',
                color: 'white'
              }}>
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Blockchain Info - Added this section */}
        <div style={{
          padding: '1.5rem',
          backgroundColor: 'rgba(17, 24, 39, 0.4)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <BlockchainInfo />
        </div>

        {/* Exercises Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
          padding: '2rem',
          backgroundColor: 'rgba(17, 24, 39, 0.3)'
        }}>
          {exercises.map((exercise) => (
            <ExerciseCard 
              key={exercise.number}
              number={exercise.number}
              title={exercise.title}
            />
          ))}
        </div>

        {/* Footer */}
        <div style={{
          backgroundColor: 'rgba(17, 24, 39, 0.5)',
          padding: '1rem',
          textAlign: 'center',
          color: '#d1d5db',
          fontSize: '0.875rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
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
      style={{
        display: 'block',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(5px)',
        borderRadius: '0.75rem',
        padding: '1.25rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        textDecoration: 'none',
        ':hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 10px 15px rgba(0, 0, 0, 0.2)',
          borderColor: 'rgba(255, 255, 255, 0.3)'
        }
      }}
    >
      <div style={{ 
        display: 'flex',
        alignItems: 'center',
        height: '100%'
      }}>
        <div style={{
          width: '2.5rem',
          height: '2.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '0.5rem',
          marginRight: '1rem',
          flexShrink: 0
        }}>
          <span style={{ 
            color: 'white',
            fontWeight: '700',
            fontSize: '1.1rem'
          }}>
            {number}
          </span>
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ 
            color: 'white',
            fontWeight: '500',
            margin: 0,
            fontSize: '1rem',
            lineHeight: '1.4'
          }}>
            {title}
          </h3>
        </div>
        <svg style={{ 
          width: '1.25rem',
          height: '1.25rem',
          color: 'rgba(255, 255, 255, 0.7)',
          flexShrink: 0,
          marginLeft: '0.5rem'
        }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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