import {MaterialCommunityIcons} from "@expo/vector-icons";
import {MaterialIcons} from "@expo/vector-icons";
import React from "react";
import {StyleProp, TextStyle} from "react-native";
import Item from "../../../components/Item";
import {Text, XStack} from "../../../components/ui";
import {Submission} from "../../../services/api";


function getStatusLabel(submission?: Submission, dueDateRaw?: string, lockedForUser?: boolean): string | null {
  if (!submission || submission.workflow_state === 'unsubmitted') {
    const isOverdue = dueDateRaw ? new Date(dueDateRaw) < new Date() : false;
    if (isOverdue && lockedForUser === false) return '未提出（遅延）';
    return isOverdue ? '期限切れ' : null;
  }
  switch (submission.workflow_state) {
    case 'graded':
      return (submission.score !== null && submission.score !== undefined) ? '採点済み' : '提出済';
    case 'submitted':
      return '提出済';
    case 'pending_review':
      return 'レビュー中';
    default:
      return null;
  }
}

function ScoreBadge({submission, pointsPossible, dueDateRaw, lockedForUser}: {
  submission?: Submission;
  pointsPossible?: number;
  dueDateRaw?: string;
  lockedForUser?: boolean;
}) {
  const max = pointsPossible !== undefined && pointsPossible !== null ? pointsPossible : '?';
  const isOverdue = dueDateRaw ? new Date(dueDateRaw) < new Date() : false;
  // 未提出かつ受付中（期限超過）の場合のみアイコンを表示
  const showWarningIcon = (!submission || submission.workflow_state === 'unsubmitted') && isOverdue && lockedForUser === false;

  let scoreText: string;
  if (!submission || submission.workflow_state === 'unsubmitted') {
    if (!isOverdue) {
      scoreText = `-/${max}`;
    } else if (lockedForUser !== false) {
      scoreText = `0/${max}`;
    } else {
      scoreText = `-/${max}`;
    }
  } else if (submission.workflow_state === 'graded' && submission.score !== null && submission.score !== undefined) {
    scoreText = `${submission.score}/${max}`;
  } else if (submission.workflow_state === 'submitted' || submission.workflow_state === 'graded') {
    scoreText = `-/${max}`;
  } else {
    return null;
  }

  return (
    <XStack alignItems="center" gap="$1" style={{marginLeft: 8}}>
      {showWarningIcon &&
        <MaterialCommunityIcons name="alert-circle" style={{marginRight: 4}} size={20} color="#f59e0b"/>}
      <Text fontSize={15} color="#000">{scoreText}</Text>
    </XStack>
  );
}

function getBarColor(submission?: Submission, dueDateRaw?: string, lockedForUser?: boolean): string {
  if (!submission || submission.workflow_state === 'unsubmitted') {
    const isOverdue = dueDateRaw ? new Date(dueDateRaw) < new Date() : false;
    if (!isOverdue) return '#e0e0e0';
    return lockedForUser === false ? '#f59e0b' : '#ef4444';
  }
  return '#d8d8d8';
}

export default function AssignmentItem({
                                         title,
                                         dueDate,
                                         dueDateRaw,
                                         courseName,
                                         onPress,
                                         titleStyle,
                                         submission,
                                         pointsPossible,
                                         lockedForUser,
                                         showIcon
                                       }: {
  title: string,
  dueDate: string,
  dueDateRaw?: string,
  courseName?: string,
  onPress: () => void,
  titleStyle?: StyleProp<TextStyle>,
  submission?: Submission,
  pointsPossible?: number,
  lockedForUser?: boolean,
  showIcon?: boolean,
}) {
  const statusLabel = getStatusLabel(submission, dueDateRaw, lockedForUser);
  const isOverdue = (!submission || submission.workflow_state === 'unsubmitted')
    && (dueDateRaw ? new Date(dueDateRaw) < new Date() : false);
  const isOverdueDelayed = isOverdue && lockedForUser === false;
  const isOverdueLocked = isOverdue && lockedForUser !== false;
  const subTextColor = isOverdueDelayed ? '#e3920a' : isOverdueLocked ? '#ef4444' : '#666';
  const subTextFontWeight = isOverdueDelayed ? 'bold' : 'normal';
  const subText = (
    <>
      <Text fontSize={12} color="#666">期限: {dueDate}</Text>
      {courseName && <Text fontSize={12} color="#666"> ・{courseName}</Text>}
      {statusLabel && (<>
        <Text fontSize={12} color="#666">・</Text>
        <Text fontSize={12} color={subTextColor} fontWeight={subTextFontWeight}>{statusLabel}</Text>
      </>)}
    </>
  );
  return (
    <Item
      title={title}
      subText={subText}
      onPress={onPress}
      icon={showIcon ? <MaterialIcons name="assignment" size={23} color="#666"/> : null}
      barColor={showIcon ? undefined : getBarColor(submission, dueDateRaw, lockedForUser)}
      titleStyle={titleStyle}
      rightElement={<ScoreBadge submission={submission} pointsPossible={pointsPossible} dueDateRaw={dueDateRaw}
                                lockedForUser={lockedForUser}/>}
    />
  )
}
