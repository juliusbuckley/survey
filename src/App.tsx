import './App.css';

import { SurveyStatus, SURVEY as surveyQuestions } from './const';

import Survey from './components/Survey';
import { SurveyAnswers } from './types';
import SurveySummary from './components/SurveySummary';
import { generateAnswers } from './util';
import { useState } from 'react';

const App = () => {
  const [surveyStatus, setSurveyStatus] = useState<SurveyStatus>(
    SurveyStatus.Start
  );
  const [surveyResults, setSurveyResults] = useState<SurveyAnswers>(
    generateAnswers(Object.keys(surveyQuestions).length)
  );

  const onSetSurveyStatus = (status: SurveyStatus) => {
    setSurveyStatus(status);
  };

  const onSetSurveyResults = (results: SurveyAnswers) => {
    setSurveyResults(results);
  };

  return (
    <div className="appContainer">
      {surveyStatus === SurveyStatus.Active && (
        <Survey
          questions={surveyQuestions}
          onSetSurveyStatus={onSetSurveyStatus}
          onSetSurveyResults={onSetSurveyResults}
        />
      )}
      {surveyStatus === SurveyStatus.Start && (
        <>
          <div className="surveyStart">
            <span className="surveyStartText">
              Click "Start Survey" to begin your survey! 🚀🔮
            </span>
            <button
              className="btn"
              onClick={() => setSurveyStatus(SurveyStatus.Active)}
            >
              Start Survey
            </button>
          </div>
        </>
      )}
      {surveyStatus === SurveyStatus.End && (
        <div className="surveyEndContainer">
          <span className="surveyEndResponse">Thanks for your responses!</span>
          <SurveySummary questions={surveyQuestions} answers={surveyResults} />
        </div>
      )}
    </div>
  );
};

export default App;
