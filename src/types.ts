export interface Survey {
  [questionId: string]: SurveyQuestion;
}

export interface SurveyAnswers {
  [questionId: string]: SurveyAnswer;
}

export interface SurveyAnswer {
  [key: string]: boolean;
}

export interface SummaryAnswer {
  surveyIndex: number;
  answer: string;
}

interface SurveyQuestion {
  question: string;
  answers: string[];
  next: Record<string, string>;
}
