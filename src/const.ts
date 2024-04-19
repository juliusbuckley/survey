import { Survey } from './types';

export const END_SURVEY_KEY = 'End';

export enum SurveyStatus {
  Active = 'Active',
  Start = 'Start',
  End = 'End',
}

export const SURVEY: Survey = {
  '0': {
    question: 'Does your business operate in CA?',
    answers: ['Yes', 'No'],
    next: {
      Yes: '1',
      No: END_SURVEY_KEY,
    },
  },
  '1': {
    question: 'How many employees do you have?',
    answers: ['More than 100', '100 or fewer'],
    next: {
      'More than 100': END_SURVEY_KEY,
      '100 or fewer': '2',
    },
  },
  '2': {
    question: 'Do you serve food?',
    answers: ['Yes', 'No'],
    next: {
      Yes: '3',
      No: '5',
    },
  },
  '3': {
    question: 'Do you serve hot food?',
    answers: ['Yes', 'No'],
    next: { Yes: '4', No: '4' },
  },
  '4': {
    question: 'Are you open past midnight?',
    answers: ['Yes', 'No'],
    next: { Yes: '5', No: '5' },
  },
  '5': {
    question: 'Do you host live music?',
    answers: ['Yes', 'No'],
    next: { Yes: END_SURVEY_KEY, No: END_SURVEY_KEY },
  },
};

export const ALPHABET = Array.from({ length: 26 }, (_, index) =>
  String.fromCharCode(65 + index)
);
