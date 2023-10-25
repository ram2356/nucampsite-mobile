import { useDispatch } from "react-redux";
import { toggleFavorite } from "../features/favorites/favoritesSlice";
import { FlatList, StyleSheet, Text, View } from "react-native";
import RenderCampsite from "../features/campsites/RenderCampsite";
import { useSelector } from "react-redux";

const CampsiteInfoScreen = ({ route }) => {
  const comments = useSelector((state) => state.comments);
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();
  const { campsite } = route.params;
  const renderCommentItem = ({ item }) => {
    return (
      <View style={styles.commentItem}>
        <Text style={{ fontsize: 14 }}>{item.text}</Text>
        <Text style={{ fontsize: 12 }}>{item.rating} Stars</Text>
        <Text
          style={{ fontsize: 12 }}
        >{`-- ${item.author}, ${item.date}`}</Text>
      </View>
    );
  };
  return (
    <FlatList
      data={comments.commentsArray.filter(
        (comment) => comment.campsiteId === campsite.id
      )}
      renderItem={renderCommentItem}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ marginHorizontal: 20, paddingVertical: 20 }}
      ListHeaderComponent={
        <>
          <RenderCampsite
            campsite={campsite}
            isFavorite={favorites.includes(campsite.id)}
            markFavorite={() => dispatch(toggleFavorite(campsite.id))}
          />
          <Text style={styles.commentsTitle}>Comments</Text>
        </>
      }
    />
  );
};
const styles = StyleSheet.create({
  commentsTitle: {
    textAlign: "center",
    backgroundColor: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    color: "#43484D",
    padding: 10,
    paddingTop: 30,
  },
  commentItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
});

export default CampsiteInfoScreen;
