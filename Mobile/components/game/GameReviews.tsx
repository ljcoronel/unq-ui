import { FullGame, Review } from "@/types/games.types";
import { User } from "@/types/user.types";
import { Image, StyleSheet, Text, View } from "react-native";
import GameOwnReview from "./GameOwnReview";
import GameReviewForm from "./GameReviewForm";
import { Feather } from "@expo/vector-icons";
import { colors } from "@/constants/colors";

export default function GameReviews({game, currentUser} : {game: FullGame, currentUser: User}){
    return(
        <View style={styles.reviewsContainer}>
            {currentUser?.games.some((userGame) => userGame.id === game.id) &&
            (game.reviews.some((userReview) => userReview.user.id === currentUser.id) ? (
                <GameOwnReview
                user={currentUser}
                review={game.reviews.find((review) => review?.user.id === currentUser.id)!}
                />
            ) : (
                <GameReviewForm user={currentUser} game={game} />
            ))}
            <View>
                {game.reviews
                    .filter((review) => review.user.id !== currentUser?.id)
                    .map((review, idx) => (
                        <View key={idx} style={styles.reviewCard}>
                            <View style={styles.reviewHeader}>
                                <Image style={styles.userImage} source={{uri: review.user.image}}/>
                                <Text style={styles.reviewUserName}>{review.user.name}</Text>
                            {review.isRecommended?(
                                <Feather style={styles.recomended} name="thumbs-up" size={24} color={colors.lightGrey} />    
                            ):(
                                <Feather style={styles.notRecomended} name="thumbs-down" size={24} color={colors.lightGrey} />
                            )}
                            </View>
                            <Text style={styles.reviewText}>{review.text}</Text>
                        </View>

                    ))}
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    reviewsContainer: {
        padding: 20,
    },
    reviewCard: {
        padding: 10,
        backgroundColor: colors.grey2,
        marginBottom: 15,

    },
    reviewHeader: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
        alignItems: 'center',
        marginBottom: 15,

    },
    userImage: {
        width: 40,
        aspectRatio: 1,
        borderColor: colors.lightGrey,
        borderStyle:"solid",
        borderWidth: 1, 
        borderRadius: 20
    },
    recomended: {
        backgroundColor: "#09acf2",
        padding: 5,
        borderRadius: 5,
        transform: [{scaleX: -1}],
        opacity: 0.5,
    },
    notRecomended: {
        backgroundColor: "#f44336",
        padding: 5,
        borderRadius: 5,
        opacity: 0.5,
    },
    reviewUserName: {
        fontSize: 20,
        fontWeight: 800,
        color: colors.lightGrey,
        fontFamily: "Inter",
    },
    reviewText: {
        padding: 5,
        alignItems: 'center',
        fontSize: 16,
        fontWeight: 500,
        color: colors.lightGrey,
        fontFamily: "Inter",
    }

});