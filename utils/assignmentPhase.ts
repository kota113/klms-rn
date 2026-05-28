import {Assignment} from "../services/api";

export type AssignmentPhase = "before" | "submitted" | "overdue";

/**
 * 提出済みと判断できる証拠があるかどうかを返す。
 * workflow_state が明示的に "unsubmitted" の場合は未提出として扱う。
 */
export const hasSubmissionEvidence = (assignment: Assignment): boolean => {
  if (assignment.submission?.workflow_state === "unsubmitted") {
    return false;
  }
  return Boolean(
    assignment.submission?.submitted_at ||
    assignment.has_submitted_submissions ||
    assignment.submission?.workflow_state === "submitted" ||
    assignment.submission?.workflow_state === "pending_review"
  );
};

/**
 * 未提出かつ採点済みかどうかを返す。
 */
export const isUnsubmittedGraded = (assignment: Assignment): boolean => {
  return assignment.submission?.workflow_state === "graded" && !hasSubmissionEvidence(assignment);
};

/**
 * 課題の現在のフェーズを返す。
 */
export const getPhase = (assignment: Assignment): AssignmentPhase => {
  if (hasSubmissionEvidence(assignment)) {
    return "submitted";
  }

  const isPastDue = !!(
    assignment.due_at && new Date(assignment.due_at) < new Date()
  );
  if (isPastDue) return "overdue";

  return "before";
};
