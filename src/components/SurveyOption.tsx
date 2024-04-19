import { ALPHABET } from '../const';
import classnames from 'classnames';

interface SurveyOptionProps {
  optionIndex: number;
  text: string;
  selected: boolean;
  toggleSelected: () => void;
}
const SurveyOption = ({
  optionIndex,
  text,
  selected,
  toggleSelected,
}: SurveyOptionProps) => (
  <div
    onClick={toggleSelected}
    className={classnames('surveyOptionContainer', {
      surveyOptionContainerSelected: selected,
    })}
  >
    <div className="surveyOptionIndexAndTextContainer">
      <div
        className={classnames('surveyOptionIndex', {
          surveyOptionIndexSelected: selected,
        })}
      >
        {ALPHABET[optionIndex]}
      </div>
      <div className="surveyOptionText">{text}</div>
    </div>
    {selected && <div>✓</div>}
  </div>
);

export default SurveyOption;
