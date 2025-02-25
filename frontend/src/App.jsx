import { useState } from 'react';
import Home from './pages/Home';
import Question from './pages/Question';
import Answer from './pages/Answer';
import ScoreCard from './pages/ScoreCard';
import Loading from './pages/Loading';
import Help from './pages/Help';

function App() {
  const [participantName, setParticipantName] = useState('');
  const [currentPage, setCurrentPage] = useState('home'); // Track the current page
  const [questionNumber, setQuestionNumber] = useState(1); // Track the question number
  const [previousPage, setPreviousPage] = useState('home'); // Track the previous page
  const [questions, setQuestions] = useState([]); // Track the questions
  const [answers, setAnswers] = useState([]); // Track the answers
  const [participantid,setParticipantId] = useState('');

  return (
    <>
      {currentPage === 'loading' && <Loading questions={questions}  />}
      {currentPage === 'help' && <Help previousPage={previousPage} setCurrentPage={setCurrentPage} setQuestionNumber={setQuestionNumber} />}
      {currentPage === 'home' && <Home participantName={participantName} setParticipantName={setParticipantName} setPreviousPage={setPreviousPage} setCurrentPage={setCurrentPage} setQuestions={setQuestions} />}
      {currentPage === 'question' && <Question setParticipantId={setParticipantId} participantName={participantName} setCurrentPage={setCurrentPage}  questionNumber={questionNumber} setQuestionNumber={setQuestionNumber} questions={questions} />}
      {currentPage === 'answer' && <Answer setParticipantId={setParticipantId} participantName={participantName} questionNumber={questionNumber} setQuestionNumber={setQuestionNumber} setCurrentPage={setCurrentPage} questions={questions} setQuestions={setQuestions} />}
      {currentPage === 'scorecard' && <ScoreCard participantid={participantid}  setPreviousPage={setPreviousPage} setCurrentPage={setCurrentPage}  questionNumber={questionNumber} setQuestionNumber={setQuestionNumber} questions={questions} setQuestions={setQuestions} answers={answers} setAnswers={setAnswers}   />}
    </>
  );
}

export default App;
