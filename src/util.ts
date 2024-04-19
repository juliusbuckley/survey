import { SurveyAnswers } from './types';

export const generateAnswers = (num: number) => {
  const surveyAnswers: SurveyAnswers = {};

  for (let i = 0; i < num; i++) {
    surveyAnswers[i] = {};
  }

  return surveyAnswers;
};
