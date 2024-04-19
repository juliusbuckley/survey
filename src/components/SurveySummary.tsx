import { SummaryAnswer, Survey, SurveyAnswers } from '../types';

import classnames from 'classnames';

interface SurveySummaryProps {
  answers: SurveyAnswers;
  questions: Survey;
  surveyIndex?: number;
}

const SurveySummary = ({
  answers: surveyAnswers,
  surveyIndex = Object.keys(surveyAnswers).length,
  questions,
}: SurveySummaryProps) => {
  const summaryAnswers: SummaryAnswer[] = Object.entries(surveyAnswers)
    .slice(0, surveyIndex)
    .map(([surveyIndex, answer]) => ({
      surveyIndex: Number(surveyIndex),
      answer: Object.keys(answer)[0],
    }));

  return (
    <>
      {summaryAnswers.map(
        ({ surveyIndex, answer }) =>
          answer.length > 0 && (
            <div
              key={answer + surveyIndex}
              className={classnames(
                'surveyIndexAndQuestionContainer',
                'historyIndex'
              )}
            >
              <span className="surveyIndex">{`${surveyIndex + 1} →`}</span>
              <>{`${questions[surveyIndex].question} → ${answer}`}</>
            </div>
          )
      )}
    </>
  );
};

export default SurveySummary;
