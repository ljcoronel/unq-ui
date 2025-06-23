import {Text, TouchableOpacity} from "react-native";
import {addGamesButtonStyles} from "@/components/AddGamesButton/addGamesButton.styles";

const AddGamesButton = ({ onPress }) => {
    return (
        <TouchableOpacity style={addGamesButtonStyles.addGamesButton} onPress={onPress}>
            <Text style={addGamesButtonStyles.buttonText}>
                Add games
            </Text>
        </TouchableOpacity>
    )
}

export default AddGamesButton;