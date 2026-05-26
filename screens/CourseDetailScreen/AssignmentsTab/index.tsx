import {Text, YStack} from "../../../components/ui";
import {ScrollView} from "react-native";
import AssignmentItem from "./AssignmentItem";
import React, {useEffect, useState} from "react";
import {Skeleton} from "../../../components/skeleton";
import {Assignment, assignmentsService} from "../../../services/api";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../../components/Navigation";

interface AssignmentsTabProps {
  courseId: number;
}

export default function AssignmentsTab({courseId}: AssignmentsTabProps) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [upcomingAssignments, setUpcomingAssignments] = useState<Assignment[]>([]);
  const [pastAssignments, setPastAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        // Fetch upcoming assignments
        const upcomingData = await assignmentsService.getAssignments(courseId, {
          bucket: 'upcoming'
        });
        setUpcomingAssignments(upcomingData);

        // Fetch past assignments
        const pastData = await assignmentsService.getAssignments(courseId, {
          bucket: 'past'
        });
        setPastAssignments(pastData);
      } catch (error) {
        console.error('Error fetching assignments:', error);
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchAssignments();
    }
  }, [courseId]);

  return (
    <ScrollView>
      <YStack backgroundColor={"white"} minHeight={"100%"} paddingHorizontal={"$4.5"} paddingVertical={"$4"}>
        <YStack marginTop={"$2"}>
          <Text fontSize={20} marginTop={"$2"} marginBottom={"$3"} fontWeight={"bold"}>これからの課題</Text>
          {loading ? (
            Array.from({length: 2}).map((_, index) => (
              <YStack key={index} marginBottom="$3">
                <Skeleton width="100%" height={58}/>
              </YStack>
            ))
          ) : upcomingAssignments.length > 0 ? (
            upcomingAssignments.map((assignment) => (
              <AssignmentItem
                key={assignment.id.toString()}
                id={assignment.id.toString()}
                title={assignment.name}
                dueDate={assignment.due_at ? new Date(assignment.due_at).toLocaleDateString() : 'なし'}
                onPress={() => navigation.navigate("AssignmentDetail", {
                  courseId,
                  assignmentId: assignment.id,
                  title: assignment.name,
                })}
              />
            ))
          ) : (
            <Text>なし</Text>
          )}
        </YStack>
        <YStack marginTop={"$6"}>
          <Text fontSize={20} marginTop={"$2"} marginBottom={"$3"} fontWeight={"bold"}>過ぎた課題</Text>
          {loading ? (
            Array.from({length: 2}).map((_, index) => (
              <YStack key={index} marginBottom="$3">
                <Skeleton width="100%" height={58}/>
              </YStack>
            ))
          ) : pastAssignments.length > 0 ? (
            pastAssignments.map((assignment) => (
              <AssignmentItem
                key={assignment.id.toString()}
                id={assignment.id.toString()}
                title={assignment.name}
                dueDate={assignment.due_at ? new Date(assignment.due_at).toLocaleDateString() : 'なし'}
                onPress={() => navigation.navigate("AssignmentDetail", {
                  courseId,
                  assignmentId: assignment.id,
                  title: assignment.name,
                })}
              />
            ))
          ) : (
            <Text>なし</Text>
          )}
        </YStack>
      </YStack>
    </ScrollView>
  )
}
