export class TutorialStep {
  step: string;
  title: string;
  text: string;
  onNext: () => void;
  onPrev: () => void;
  position: string;

  static of(step: string, title: string, text: string, onNext = () => {
  }, onPrev = () => {
  }, position = 'center'): TutorialStep {
    const tutorialStep = new TutorialStep();
    tutorialStep.step = step;
    tutorialStep.title = title;
    tutorialStep.text = text;
    tutorialStep.onNext = onNext;
    tutorialStep.onPrev = onPrev;
    tutorialStep.position = position;
    return tutorialStep;
  }
}
