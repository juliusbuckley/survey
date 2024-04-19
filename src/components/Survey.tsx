import { END_SURVEY_KEY, SurveyStatus } from '../const';
import { SurveyAnswers, Survey as SurveyType } from '../types';

import SurveyOption from './SurveyOption';
import SurveySummary from './SurveySummary';
import classnames from 'classnames';
import { generateAnswers } from '../util';
import { useState } from 'react';

interface SurveyProps {
  questions: SurveyType;
  onSetSurveyStatus: (status: SurveyStatus) => void;
  onSetSurveyResults: (results: SurveyAnswers) => void;
}

const Survey = ({
  questions,
  onSetSurveyStatus,
  onSetSurveyResults,
}: SurveyProps) => {
  const [surveyAnswers, setSurveyAnswers] = useState<SurveyAnswers>(
    generateAnswers(Object.keys(questions).length)
  );
  const [surveyIndex, setSurveyIndex] = useState<number>(0);
  const [selectedSurveyAnswer, setSelectedSurveyAnswer] = useState('');
  const [history, setHistory] = useState<number[]>([]);
  const currentSurvey = questions[surveyIndex];

  const handleToggleSelected = (answer: string) => {
    setSelectedSurveyAnswer(answer);

    const currentHistory = [...history];
    currentHistory.push(surveyIndex);
    setHistory(currentHistory);

    const currentSurveyAnswers = { ...surveyAnswers };

    if (currentSurveyAnswers[surveyIndex]?.hasOwnProperty(answer)) {
      currentSurveyAnswers[surveyIndex][answer] =
        !currentSurveyAnswers[surveyIndex][answer];
    } else {
      currentSurveyAnswers[surveyIndex] = {};
      currentSurveyAnswers[surveyIndex][answer] = true;
      const keysToBeDeleted = Object.keys(currentSurveyAnswers).slice(
        surveyIndex + 1
      );
      for (const key of keysToBeDeleted) {
        delete currentSurveyAnswers[key];
      }
    }
    setSurveyAnswers(currentSurveyAnswers);

    const next = questions[surveyIndex].next[answer];

    if (next === END_SURVEY_KEY) {
      onSetSurveyStatus(SurveyStatus.End);
      onSetSurveyResults(currentSurveyAnswers);
      console.log(
        `survey answers:\n${JSON.stringify(currentSurveyAnswers, null, 2)}`
      );
    } else {
      setSurveyIndex(parseInt(next));
    }
  };

  return (
    <div>
      {surveyIndex > 0 && (
        <button
          className={classnames('btn', 'surveyBtn')}
          onClick={() => {
            const currentHistory = [...history];
            const prevIndex = currentHistory.pop() || 0;
            setHistory(currentHistory);
            setSurveyIndex(prevIndex);
          }}
        >
          <span>{`← Go Back to #${history[history.length - 1] + 1}`}</span>
        </button>
      )}
      <div className="surveyContainer">
        <div className="surveyIndexAndQuestionContainer">
          <span className="surveyIndex">{`${surveyIndex + 1} →`}</span>
          <>{currentSurvey.question}</>
        </div>
        <div className="surveyOptions">
          {(currentSurvey?.answers ?? []).map((answer, index) => (
            <SurveyOption
              key={answer}
              optionIndex={index}
              text={answer}
              selected={surveyAnswers?.[surveyIndex]?.[answer] ?? false}
              toggleSelected={() => {
                handleToggleSelected(answer);
              }}
            />
          ))}
          {surveyAnswers[surveyIndex]?.[selectedSurveyAnswer] && (
            <div className="confirmBtnContainer">
              <button
                className={classnames('btn', 'confirmBtn')}
                onClick={() => {
                  const currentHistory = [...history];
                  currentHistory.push(surveyIndex);
                  setHistory(currentHistory);
                  const next =
                    questions[surveyIndex].next[selectedSurveyAnswer];
                  setSurveyIndex(parseInt(next));
                }}
              >
                <span className="confirm">{'ok ✔'}</span>
              </button>
            </div>
          )}
        </div>
      </div>
      <SurveySummary
        answers={surveyAnswers}
        surveyIndex={surveyIndex}
        questions={questions}
      />
    </div>
  );
};

export default Survey;
