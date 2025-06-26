import { colors } from "@/theme/colors";
import { GameTag } from "@/types/games.types";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function GameTags( tags : { tags: GameTag[] }  ){
    const [modalVisible, setModalVisible] = useState(false);

    return ( 
        <View style={styles.gameTagsContainer}>
            
            <Text style={styles.tagTitle}>Tags: </Text>
            {tags.tags.length < 5? (
                tags.tags.map((tag, idx) => 
                <Text
                    key={`${tag.id}-${idx}`}
                    style={styles.gameTag}>{tag.name}</Text>
            )):(<>
                {tags.tags.slice(0,5).map((tag, idx)=> 
                    <Text
                    key={`${tag.id}-${idx}`}
                    style={styles.gameTag}>{tag.name}</Text>
                )}
                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}><Text style={styles.gameTag}>more...</Text></TouchableOpacity> 
                </>
                )}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                setModalVisible(!modalVisible);}}>
                <View style={styles.centeredView}>
                
                    <TouchableOpacity style={styles.closeContainer} onPress={() => setModalVisible(!modalVisible)}>
                        <Entypo name="chevron-down" size={24} color="black" />
                    </TouchableOpacity>
                    
                    <View style={styles.modalView}>    
                        <Text style={styles.tagTitle}>All Tags: </Text>
                        {tags.tags.map((tag, idx) => (
                        <Text
                            key={`${tag.id}-${idx}`}
                            style={styles.gameTag}>{tag.name}</Text>))}
                    </View>
                </View>
                    
                
            </Modal>
        </View> 
    )
}

const styles =  StyleSheet.create({
    gameTagsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 5,
    },
    gameTag: {
        fontSize: 14,
        color: colors.darkGrey,
        fontWeight: "600",
        fontFamily: "Inter",
        textDecorationLine: "underline",
    },
    centeredView: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: "100%",
        marginTop:  220,
        backgroundColor: colors.lightGrey,
  },
    modalView: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 5,
        backgroundColor: colors.lightGrey,
        alignItems: 'center',
        padding: 20,
        
    },
    closeContainer: {
        borderRadius: 10,
        padding: 10,
    },
    tagTitle:{
        fontWeight: "800",
        fontFamily: "Inter",
    }
});