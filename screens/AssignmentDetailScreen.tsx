import {MaterialIcons} from "@expo/vector-icons";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import React, {useEffect, useMemo, useState} from "react";
import {ScrollView, StyleSheet, Text as RNText, TouchableOpacity, View} from "react-native";
import NativeLoadingIndicator from "../components/NativeLoadingIndicator";
import {Text, XStack, YStack} from "../components/ui";
import {RootStackParamList} from "../components/Navigation";
import {Assignment, assignmentsService} from "../services/api";

type Props = NativeStackScreenProps<RootStackParamList, "AssignmentDetail">;

// ─── Formatters ────────────────────────────────────────────────────────────────

const formatDateTime = (value?: string | null) => {
  if (!value) {
    return "なし";
  }

  return new Date(value).toLocaleString("ja-JP", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatBoolean = (value?: boolean) => {
  if (value === undefined) {
    return "不明";
  }

  return value ? "はい" : "いいえ";
};

const formatList = (value?: Array<string | number>) => {
  if (!value || value.length === 0) {
    return "なし";
  }

  return value.join(", ");
};

const submissionTypeLabels: Record<string, string> = {
  discussion_topic: "ディスカッション",
  external_tool: "外部ツール",
  media_recording: "録音・録画",
  none: "提出なし",
  online_quiz: "クイズ",
  online_text_entry: "テキスト入力",
  online_upload: "ファイルアップロード",
  online_url: "URL",
  on_paper: "紙で提出",
  student_annotation: "学生による注釈",
};

const formatSubmissionTypes = (value?: string[]) => {
  if (!value || value.length === 0) {
    return "なし";
  }

  return value.map((type) => submissionTypeLabels[type] ?? type).join("・");
};

const submissionWorkflowStateLabels: Record<string, string> = {
  graded: "採点済み",
  pending_review: "レビュー待ち",
  submitted: "提出済み",
  unsubmitted: "未提出",
};

const formatSubmissionWorkflowState = (value?: string | null, fallback?: string) => {
  const state = value ?? fallback;
  if (!state) {
    return "不明";
  }

  return submissionWorkflowStateLabels[state] ?? `不明（${state}）`;
};

const stripHtml = (html?: string | null) => {
  if (!html) {
    return "";
  }

  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'")
    .trim();
};

// ─── State detection ───────────────────────────────────────────────────────────

type AssignmentPhase = "before" | "submitted" | "overdue";

const getPhase = (assignment: Assignment): AssignmentPhase => {
  if (
    assignment.submission?.workflow_state === "submitted" ||
    assignment.submission?.workflow_state === "graded" ||
    assignment.submission?.workflow_state === "pending_review"
  ) {
    return "submitted";
  }

  const isSubmitted = !!(
    assignment.submission?.submitted_at ||
    assignment.has_submitted_submissions
  );
  if (isSubmitted) return "submitted";

  const isPastDue = !!(
    assignment.due_at && new Date(assignment.due_at) < new Date()
  );
  if (isPastDue) return "overdue";

  return "before";
};

// ─── Sub-components ────────────────────────────────────────────────────────────

function DetailRow({label, value}: {label: string; value?: string | number | null}) {
  return (
    <XStack alignItems="flex-start" justifyContent="space-between" gap="$3" paddingVertical="$2">
      <Text fontSize={14} color="#666">{label}</Text>
      <View style={styles.rowValue}>
        <Text fontSize={15} color="#222" textAlign="right">{value ?? "なし"}</Text>
      </View>
    </XStack>
  );
}

function Section({title, children}: {title: string; children: React.ReactNode}) {
  return (
    <YStack marginBottom="$5">
      <Text fontSize={18} fontWeight="800" color="#222" marginBottom="$2">{title}</Text>
      <YStack>{children}</YStack>
    </YStack>
  );
}

/** 状態バナー（提出前 / 提出済み / 期限切れ） */
function PhaseBanner({phase, assignment}: {phase: AssignmentPhase; assignment: Assignment}) {
  const configs: Record<AssignmentPhase, {bg: string; icon: string; label: string; sub?: string}> = {
    before: {
      bg: "#EFF6FF",
      icon: "schedule",
      label: "未提出",
      sub: assignment.due_at
        ? `期限: ${formatDateTime(assignment.due_at)}`
        : undefined,
    },
    submitted: {
      bg: "#F0FDF4",
      icon: "check-circle",
      label: formatSubmissionWorkflowState(assignment.submission?.workflow_state, "submitted"),
      sub: assignment.submission?.submitted_at
        ? `提出日時: ${formatDateTime(assignment.submission.submitted_at)}`
        : undefined,
    },
    overdue: {
      bg: "#FEF2F2",
      icon: "warning",
      label: "期限切れ（未提出）",
      sub: assignment.due_at
        ? `期限: ${formatDateTime(assignment.due_at)}`
        : undefined,
    },
  };

  const {bg, icon, label, sub} = configs[phase];
  const iconColor = phase === "before" ? "#2563EB" : phase === "submitted" ? "#16A34A" : "#DC2626";

  return (
    <XStack
      alignItems="center"
      backgroundColor={bg}
      borderRadius={10}
      paddingHorizontal="$4"
      paddingVertical="$3"
      gap="$3"
      marginBottom="$4"
    >
      <MaterialIcons name={icon as any} size={26} color={iconColor}/>
      <YStack>
        <Text fontSize={16} color={iconColor}>{label}</Text>
        {sub ? <Text fontSize={13} color="#555">{sub}</Text> : null}
      </YStack>
    </XStack>
  );
}

// ─── Phase-specific section layouts ───────────────────────────────────────────

/** 提出前: 期限・説明・提出方法を優先 */
function BeforeSections({assignment, description}: {assignment: Assignment; description: string}) {
  return (
    <>
      <Section title="期限・ステータス">
        <DetailRow label="期限" value={formatDateTime(assignment.due_at)}/>
        <DetailRow label="公開開始" value={formatDateTime(assignment.unlock_at)}/>
        <DetailRow label="ロック" value={formatDateTime(assignment.lock_at)}/>
        <DetailRow label="満点" value={assignment.points_possible ?? "なし"}/>
        <DetailRow label="ロック中" value={formatBoolean(assignment.locked_for_user)}/>
        {assignment.lock_explanation ? (
          <DetailRow label="ロック理由" value={assignment.lock_explanation}/>
        ) : null}
      </Section>

      <Section title="説明">
        <RNText style={{fontSize: 15, color: "#333"}}>
          {description || "説明はありません。"}
        </RNText>
      </Section>

      <Section title="提出方法">
        <DetailRow label="提出形式" value={formatSubmissionTypes(assignment.submission_types)}/>
        <DetailRow label="許可拡張子" value={formatList(assignment.allowed_extensions)}/>
        <DetailRow
          label="試行回数"
          value={assignment.allowed_attempts === -1 ? "無制限" : assignment.allowed_attempts ?? "なし"}
        />
      </Section>

      {assignment.rubric && assignment.rubric.length > 0 && (
        <Section title="ルーブリック">
          <DetailRow label="合計点" value={assignment.rubric_settings?.points_possible ?? "なし"}/>
          {assignment.rubric.map((criteria, index) => (
            <YStack key={criteria.id || index} marginTop="$3">
              <Text fontSize={16} fontWeight="700" color="#333">{criteria.description || `基準 ${index + 1}`}</Text>
              <DetailRow label="点数" value={criteria.points ?? "なし"}/>
              {criteria.long_description ? (
                <Text fontSize={14} color="#666">{stripHtml(criteria.long_description)}</Text>
              ) : null}
            </YStack>
          ))}
        </Section>
      )}

      <Section title="採点">
        <DetailRow label="最終成績から除外" value={formatBoolean(assignment.omit_from_final_grade)}/>
      </Section>

      {assignment.all_dates && assignment.all_dates.length > 1 && (
        <Section title="個別期限">
          {assignment.all_dates.map((date, index) => (
            <YStack key={`${date.id ?? "base"}-${index}`} marginBottom="$3">
              <DetailRow label="対象" value={date.title || (date.base ? "全員" : `日程 ${index + 1}`)}/>
              <DetailRow label="期限" value={formatDateTime(date.due_at)}/>
              <DetailRow label="公開開始" value={formatDateTime(date.unlock_at)}/>
              <DetailRow label="ロック" value={formatDateTime(date.lock_at)}/>
            </YStack>
          ))}
        </Section>
      )}

      {assignment.overrides && assignment.overrides.length > 0 && (
        <Section title="オーバーライド">
          {assignment.overrides.map((override) => (
            <YStack key={override.id} marginBottom="$3">
              <DetailRow label="タイトル" value={override.title || `Override ${override.id}`}/>
              <DetailRow label="期限" value={formatDateTime(override.due_at)}/>
              <DetailRow label="公開開始" value={formatDateTime(override.unlock_at)}/>
              <DetailRow label="ロック" value={formatDateTime(override.lock_at)}/>
            </YStack>
          ))}
        </Section>
      )}
    </>
  );
}

/** 提出済み: 成績・提出情報・説明・統計を優先 */
function SubmittedSections({assignment, description}: {assignment: Assignment; description: string}) {
  return (
    <>
      <Section title="提出情報">
        <DetailRow label="提出日時" value={formatDateTime(assignment.submission?.submitted_at)}/>
        <DetailRow label="提出状況" value={formatSubmissionWorkflowState(assignment.submission?.workflow_state, "submitted")}/>
        <DetailRow label="遅延提出" value={formatBoolean(assignment.submission?.late)}/>
        <DetailRow label="免除" value={formatBoolean(assignment.submission?.excused)}/>
      </Section>

      <Section title="成績・評点">
        <DetailRow label="評点" value={assignment.submission?.score ?? "未採点"}/>
        <DetailRow label="成績" value={assignment.submission?.grade || "未採点"}/>
        <DetailRow label="満点" value={assignment.points_possible ?? "なし"}/>
      </Section>

      {(assignment.score_statistics?.min != null ||
        assignment.score_statistics?.max != null ||
        assignment.score_statistics?.mean != null) && (
        <Section title="クラス統計">
          <DetailRow label="最小" value={assignment.score_statistics?.min ?? "なし"}/>
          <DetailRow label="最大" value={assignment.score_statistics?.max ?? "なし"}/>
          <DetailRow label="平均" value={assignment.score_statistics?.mean ?? "なし"}/>
          <DetailRow label="中央値" value={assignment.score_statistics?.median ?? "なし"}/>
        </Section>
      )}

      <Section title="説明">
        <RNText style={{fontSize: 15, color: "#333"}}>
          {description || "説明はありません。"}
        </RNText>
      </Section>

      {assignment.rubric && assignment.rubric.length > 0 && (
        <Section title="ルーブリック">
          <DetailRow label="採点に使用" value={formatBoolean(assignment.use_rubric_for_grading)}/>
          <DetailRow label="合計点" value={assignment.rubric_settings?.points_possible ?? "なし"}/>
          {assignment.rubric.map((criteria, index) => (
            <YStack key={criteria.id || index} marginTop="$3">
              <Text fontSize={16} fontWeight="700" color="#333">{criteria.description || `基準 ${index + 1}`}</Text>
              <DetailRow label="点数" value={criteria.points ?? "なし"}/>
              {criteria.long_description ? (
                <Text fontSize={14} color="#666">{stripHtml(criteria.long_description)}</Text>
              ) : null}
            </YStack>
          ))}
        </Section>
      )}

      <Section title="提出方法">
        <DetailRow label="提出形式" value={formatSubmissionTypes(assignment.submission_types)}/>
        <DetailRow label="試行回数" value={assignment.allowed_attempts === -1 ? "無制限" : assignment.allowed_attempts ?? "なし"}/>
      </Section>

      <Section title="日程">
        <DetailRow label="期限" value={formatDateTime(assignment.due_at)}/>
        <DetailRow label="公開開始" value={formatDateTime(assignment.unlock_at)}/>
        <DetailRow label="ロック" value={formatDateTime(assignment.lock_at)}/>
      </Section>
    </>
  );
}

/** 期限切れ未提出: 期限・未提出状態・成績（もしあれば）・説明を優先 */
function OverdueSections({assignment, description}: {assignment: Assignment; description: string}) {
  return (
    <>
      <Section title="提出状況">
        <DetailRow label="期限" value={formatDateTime(assignment.due_at)}/>
        <DetailRow label="未提出扱い" value={formatBoolean(assignment.submission?.missing)}/>
        <DetailRow label="提出状況" value={formatSubmissionWorkflowState(assignment.submission?.workflow_state, "unsubmitted")}/>
        <DetailRow label="免除" value={formatBoolean(assignment.submission?.excused)}/>
      </Section>

      {(assignment.submission?.grade || assignment.submission?.score != null) && (
        <Section title="成績・評点">
          <DetailRow label="評点" value={assignment.submission?.score ?? "未採点"}/>
          <DetailRow label="成績" value={assignment.submission?.grade || "未採点"}/>
          <DetailRow label="満点" value={assignment.points_possible ?? "なし"}/>
        </Section>
      )}

      <Section title="説明">
        <RNText style={{fontSize: 15, color: "#333"}}>
          {description || "説明はありません。"}
        </RNText>
      </Section>

      <Section title="提出方法">
        <DetailRow label="提出形式" value={formatSubmissionTypes(assignment.submission_types)}/>
        <DetailRow label="許可拡張子" value={formatList(assignment.allowed_extensions)}/>
        <DetailRow label="試行回数" value={assignment.allowed_attempts === -1 ? "無制限" : assignment.allowed_attempts ?? "なし"}/>
      </Section>

      {assignment.rubric && assignment.rubric.length > 0 && (
        <Section title="ルーブリック">
          <DetailRow label="合計点" value={assignment.rubric_settings?.points_possible ?? "なし"}/>
          {assignment.rubric.map((criteria, index) => (
            <YStack key={criteria.id || index} marginTop="$3">
              <Text fontSize={16} fontWeight="700" color="#333">{criteria.description || `基準 ${index + 1}`}</Text>
              <DetailRow label="点数" value={criteria.points ?? "なし"}/>
              {criteria.long_description ? (
                <Text fontSize={14} color="#666">{stripHtml(criteria.long_description)}</Text>
              ) : null}
            </YStack>
          ))}
        </Section>
      )}

      <Section title="採点">
        <DetailRow label="最終成績から除外" value={formatBoolean(assignment.omit_from_final_grade)}/>
      </Section>

    </>
  );
}

// ─── Main screen ───────────────────────────────────────────────────────────────

export default function AssignmentDetailScreen({navigation, route}: Props) {
  const {courseId, assignmentId} = route.params;
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    assignmentsService.getAssignment(courseId, assignmentId, {
      include: ["submission", "all_dates", "overrides", "score_statistics", "can_submit"],
      all_dates: true,
    })
      .then((data) => {
        if (isMounted) {
          setAssignment(data);
          setError(null);
        }
      })
      .catch((err) => {
        console.error("Error fetching assignment:", err);
        if (isMounted) {
          setError("課題を読み込めませんでした。");
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [assignmentId, courseId]);

  const description = useMemo(() => stripHtml(assignment?.description), [assignment?.description]);

  const phase = useMemo(
    () => (assignment ? getPhase(assignment) : "before"),
    [assignment]
  );

  const openAssignmentInCanvas = () => {
    if (!assignment?.html_url) {
      return;
    }

    navigation.navigate("AuthenticatedWebView", {
      url: assignment.html_url,
      title: assignment.name,
    });
  };

  // ─── Bottom button config per phase ─────────────────────────────────────────
  const buttonConfig = useMemo(() => {
    if (!assignment) return {label: "提出する", disabled: true};

    if (phase === "submitted") {
      return {
        label: "提出内容を確認",
        disabled: !assignment.html_url,
      };
    }

    if (phase === "overdue") {
      // 期限切れでも can_submit が true なら提出可能
      if (assignment.can_submit) {
        return {label: "提出する（期限超過）", disabled: false};
      }
      return {label: "提出期限切れ", disabled: true};
    }

    // before
    if (!assignment.html_url || assignment.can_submit === false) {
      return {label: "提出できません", disabled: true};
    }
    return {label: "提出する", disabled: false};
  }, [assignment, phase]);

  return (
    <YStack flex={1} backgroundColor="white">
      <XStack alignItems="center" backgroundColor="white" paddingHorizontal="$4" paddingVertical="$4">
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialIcons name="chevron-left" size={24} color="#333"/>
        </TouchableOpacity>
        <Text fontSize={18} color="#333" numberOfLines={1}>
          課題詳細
        </Text>
      </XStack>

      {loading ? (
        <View style={styles.center}>
          <NativeLoadingIndicator/>
        </View>
      ) : error || !assignment ? (
        <YStack flex={1} alignItems="center" justifyContent="center" paddingHorizontal="$4">
          <Text color="red" textAlign="center">{error || "課題が見つかりませんでした。"}</Text>
        </YStack>
      ) : (
        <>
          <ScrollView style={{flex: 1}} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
            {/* タイトル */}
            <YStack marginBottom="$4">
              <RNText style={{fontSize: 24, fontWeight: "800", color: "#222", marginBottom: 4}}>{assignment.name}</RNText>
              <RNText style={{fontSize: 13, color: "#888"}}>
                {assignment.published ? "公開済み" : "非公開"}
              </RNText>
            </YStack>

            {/* 状態バナー */}
            <PhaseBanner phase={phase} assignment={assignment}/>

            {/* フェーズ別セクション */}
            {phase === "before" && (
              <BeforeSections assignment={assignment} description={description}/>
            )}
            {phase === "submitted" && (
              <SubmittedSections assignment={assignment} description={description}/>
            )}
            {phase === "overdue" && (
              <OverdueSections assignment={assignment} description={description}/>
            )}
          </ScrollView>

          {/* 固定アクションボタン */}
          <View style={styles.stickyAction}>
            <TouchableOpacity
              activeOpacity={0.82}
              disabled={buttonConfig.disabled}
              onPress={openAssignmentInCanvas}
              style={[
                styles.submitButton,
                buttonConfig.disabled ? styles.submitButtonDisabled : null,
              ]}
            >
              <Text fontSize={16} fontWeight="800" color="#fff" textAlign="center">
                {buttonConfig.label}
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </YStack>
  );
}

const styles = StyleSheet.create({
  backButton: {
    marginRight: 16,
  },
  center: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  content: {
    paddingBottom: 112,
    paddingHorizontal: 18,
    paddingTop: 12,
  },
  rowValue: {
    flex: 1,
    alignItems: "flex-end",
  },
  stickyAction: {
    backgroundColor: "transparent",
    bottom: 0,
    left: 0,
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 15,
    position: "absolute",
    right: 0,
  },
  submitButton: {
    alignItems: "center",
    backgroundColor: "#111111",
    borderRadius: 8,
    minHeight: 52,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  submitButtonDisabled: {
    backgroundColor: "#999999",
  },
});
