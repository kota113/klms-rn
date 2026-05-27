import {Text, YStack} from "../../../components/ui";
import {ScrollView} from "react-native";
import React, {useEffect, useState} from "react";
import GradeItem from "./GradeItem";
import {Skeleton, SkeletonText} from "../../../components/skeleton";
import {assignmentsService, Enrollment, enrollmentsService, usersService} from "../../../services/api";

interface GradesTabProps {
  courseId: number;
}

export default function GradesTab({courseId}: GradesTabProps) {
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [assignments, setAssignments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        setLoading(true);
        // First get the current user's ID
        const currentUser = await usersService.getCurrentUser();

        // Then fetch the user's enrollment in this course
        const enrollments = await enrollmentsService.getCourseEnrollments(courseId, {
          user_id: currentUser.id,
          type: ['StudentEnrollment'],
          include: ['grades']
        });

        if (enrollments && enrollments.length > 0) {
          setEnrollment(enrollments[0]);

          // Fetch submissions for the course
          const submissions = await assignmentsService.getSubmissions(courseId, {
            student_ids: [currentUser.id.toString()],
            include: ['assignment'],
            workflow_state: 'graded'
          });

          if (submissions && submissions.length > 0) {
            // Transform submissions into the format expected by GradeItem
            const gradeItems = submissions.map(submission => ({
              id: submission.assignment_id,
              title: submission.assignment.name,
              fullScore: submission.assignment.points_possible || 0,
              achievedScore: submission.score || 0,
              dueDate: submission.assignment.due_at ? new Date(submission.assignment.due_at).toLocaleDateString() : 'なし'
            }));

            setAssignments(gradeItems);
          } else {
            setAssignments([]);
          }
        } else {
          setError('このコースの成績はありません');
        }
      } catch (err) {
        console.error('Error fetching grades:', err);
        setError('Failed to load grades. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchGrades();
    }
  }, [courseId]);

  if (loading) {
    return (
      <YStack flex={1} backgroundColor="white" paddingHorizontal="$4.5" paddingVertical="$4">
        <YStack marginTop="$2">
          <SkeletonText width={90} height={25} style={{marginVertical: 8}}/>
          <SkeletonText width={64} height={35} style={{marginTop: 12}}/>
        </YStack>
        <YStack marginTop="$6">
          <SkeletonText width={74} height={22} style={{marginTop: 8, marginBottom: 14}}/>
          {Array.from({length: 4}).map((_, index) => (
            <YStack key={index} marginVertical="$2">
              <Skeleton width="100%" height={44}/>
            </YStack>
          ))}
        </YStack>
      </YStack>
    );
  }

  if (error) {
    return (
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <YStack backgroundColor="white" minHeight="100%" paddingHorizontal="$4.5" paddingVertical="$4">
          <Text marginTop="$6" textAlign="center">{error}</Text>
        </YStack>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <YStack backgroundColor={"white"} minHeight={"100%"} paddingHorizontal={"$4.5"} paddingVertical={"$4"}>
        <YStack marginTop={"$2"}>
          <Text fontSize={25} marginVertical={"$2"} fontWeight={"bold"}>Overall</Text>
          {enrollment && enrollment.grades ? (
            enrollment.grades.current_grade ? (
              <Text fontSize={35} fontWeight={"bold"} marginTop={"$3"}>
                {enrollment.grades.current_grade || `${enrollment.grades.current_score}%`}
              </Text>
            ) : <Text fontSize={35} fontWeight={"bold"} marginTop={"$3"}>不明</Text>
          ) : (
            <Text fontSize={35} fontWeight={"bold"} marginTop={"$3"}>非公開</Text>
          )}
        </YStack>
        <YStack marginTop={"$6"}>
          <Text fontSize={22} marginTop={"$2"} marginBottom={"$3.5"} fontWeight={"bold"}>課題</Text>
          {assignments.length > 0 ? (
            assignments.map(assignment => (
              <GradeItem
                key={assignment.id}
                title={assignment.title}
                fullScore={assignment.fullScore}
                achievedScore={assignment.achievedScore}
                dueDate={assignment.dueDate}
              />
            ))
          ) : (
            <Text>課題はありません</Text>
          )}
        </YStack>
      </YStack>
    </ScrollView>
  );
}
