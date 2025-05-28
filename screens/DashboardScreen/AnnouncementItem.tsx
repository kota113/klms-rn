import Item from "../../components/Item";
import {MaterialCommunityIcons} from "@expo/vector-icons";

export default function AnnouncementItem({id, title, courseName}: {
  id: string,
  title: string,
  courseName: string,
}) {
  return (
    <Item title={title} subText={courseName} onPress={() => {
    }} icon={<MaterialCommunityIcons name={"bullhorn-outline"} size={27} color="#333"/>}/>
  )
}
