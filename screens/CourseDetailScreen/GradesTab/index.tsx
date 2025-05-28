import {YStack} from "@tamagui/stacks";
import {Text} from "tamagui";
import {ActivityIndicator, ScrollView, View} from "react-native";
import React, {useEffect, useState} from "react";
import GradeItem from "./GradeItem";
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
      <YStack flex={1} justifyContent="center" alignItems="center" backgroundColor="white">
        <ActivityIndicator size="large" color="#black"/>
        <Text marginTop="$4">読込中...</Text>
      </YStack>
    );
  }

  if (error) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center" backgroundColor="white">
        <Text color="red">{error}</Text>
        <View
          style={{
            marginTop: 20,
            padding: 10,
            backgroundColor: '#f0f0f0',
            borderRadius: 5
          }}
          onTouchEnd={() => {
            if (courseId) {
              setLoading(true);
              setError(null);
              // Retry fetching grades
              usersService.getCurrentUser()
                .then(user => {
                  return Promise.all([
                    user,
                    enrollmentsService.getCourseEnrollments(courseId, {
                      user_id: user.id,
                      type: ['StudentEnrollment'],
                      include: ['grades']
                    })
                  ]);
                })
                .then(([user, enrollments]) => {
                  if (enrollments && enrollments.length > 0) {
                    setEnrollment(enrollments[0]);

                    // Fetch submissions for the course
                    return assignmentsService.getSubmissions(courseId, {
                      student_ids: [user.id.toString()],
                      include: ['assignment'],
                      workflow_state: 'graded'
                    });
                  } else {
                    setError('このコースの成績はありません');
                    return Promise.reject('No enrollment found');
                  }
                })
                .then(submissions => {
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
                })
                .catch(err => {
                  console.error('Error retrying grades fetch:', err);
                  setError('Failed to load grades. Please try again.');
                })
                .finally(() => setLoading(false));
            }
          }}
        >
          <Text>Retry</Text>
        </View>
      </YStack>
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
