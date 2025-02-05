import { useState } from 'react';
import Home from './pages/Home';
import Question from './pages/Question';
import Answer from './pages/Answer';
import ScoreCard from './pages/ScoreCard';

function App() {
  const [currentPage, setCurrentPage] = useState('home'); // Track the current page

  return (
    <>
      {currentPage === 'home' && <Home setCurrentPage={setCurrentPage} />}
      {currentPage === 'question' && <Question  setCurrentPage={setCurrentPage} />}
      {currentPage === 'answer' && <Answer  setCurrentPage={setCurrentPage} />}
      {currentPage === 'scorecard' && <ScoreCard  setCurrentPage={setCurrentPage} />}
    </>
  );
}

export default App;
