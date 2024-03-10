import { APIResponse, Constraint, Message } from "@/types/api";

export const isOnboardingScreen = (chatResponse: APIResponse) =>
  chatResponse.conversation.scenario === "on_boarding";

export const getLabel = (questions: Message) =>
  questions.length && questions[questions.length - 1];

const isMinSelectionsZero = (constraints: Constraint) =>
  constraints?.min_selections === 0;

export const hasConstraintsAndMultipleSelections = (constraints: Constraint) =>
  constraints && constraints?.max_selections > constraints?.min_selections;

export const isTypeHealthBackground = (type: string) =>
  type === "health_background";

export const showNoneOfTheseButton = (question: APIResponse["question"]) =>
  isTypeHealthBackground(question.type) ||
  (isMinSelectionsZero(question?.constraints) &&
    hasConstraintsAndMultipleSelections(question?.constraints));

export const isButtonDisabled = (question: APIResponse["question"]) =>
  showNoneOfTheseButton(question);

export const getCheckedCount = (checkedCheckboxes: boolean[]) =>
  checkedCheckboxes.filter(Boolean).length;

export const isAnalysingScreen = (chatResponse: APIResponse) =>
  chatResponse.conversation.scenario === "consultation_routine" &&
  chatResponse.conversation.phase === "pre_diagnosis";

export const isNoMatchingConditionsScreen = (chatResponse: APIResponse) =>
  chatResponse.conversation.phase === "info_result";

export const isNumberInput = (type: string) => type === "year_of_birth";

export const isNoSymptomFoundScreen = (phase: string) =>
  phase === "no_symptom_found";
