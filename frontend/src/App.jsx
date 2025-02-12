import { useState } from 'react';
import Home from './pages/Home';
import Question from './pages/Question';
import Answer from './pages/Answer';
import ScoreCard from './pages/ScoreCard';
import Loading from './pages/Loading';
import Help from './pages/Help';

function App() {
  const [currentPage, setCurrentPage] = useState('home'); // Track the current page
  const [score, setScore] = useState(0); // Track the score
  const [questionNumber, setQuestionNumber] = useState(1); // Track the question number
  const [previousPage, setPreviousPage] = useState('home'); // Track the previous page
  const [questions, setQuestions] = useState([]); // Track the questions
  const [answers, setAnswers] = useState([]); // Track the answers
  const [selectedAnswer, setSelectedAnswer] = useState(''); // Track the selected answer
  const [localimages,setLocalImages] = useState([]);  // {category: '', image: '', timestamp:'' }

  return (
    <>
      {currentPage === 'loading' && <Loading questions={questions}  />}
      {currentPage === 'help' && <Help previousPage={previousPage} setCurrentPage={setCurrentPage} setQuestionNumber={setQuestionNumber} />}
      {currentPage === 'home' && <Home localimages={localimages} setLocalImages={setLocalImages} setPreviousPage={setPreviousPage} setCurrentPage={setCurrentPage} questions={questions} setQuestions={setQuestions} />}
      {currentPage === 'question' && <Question localimages={localimages} setLocalImages={setLocalImages} setCurrentPage={setCurrentPage}  questionNumber={questionNumber} setQuestionNumber={setQuestionNumber} questions={questions} setQuestions={setQuestions} answers={answers} setAnswers={setAnswers} />}
      {currentPage === 'answer' && <Answer localimages={localimages} setLocalImages={setLocalImages} score={score} setScore={setScore}  questionNumber={questionNumber} setQuestionNumber={setQuestionNumber} setCurrentPage={setCurrentPage} questions={questions} setQuestions={setQuestions} answers={answers} setAnswers={setAnswers} selectedAnswer={selectedAnswer} setSelectedAnswer={setSelectedAnswer} />}
      {currentPage === 'scorecard' && <ScoreCard localimages={localimages} setLocalImages={setLocalImages} setPreviousPage={setPreviousPage} setCurrentPage={setCurrentPage}  questionNumber={questionNumber} setQuestionNumber={setQuestionNumber} questions={questions} setQuestions={setQuestions} answers={answers} setAnswers={setAnswers}   />}
    </>
  );
}

export default App;
