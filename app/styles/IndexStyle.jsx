import { StyleSheet } from "react-native";
import { Colors } from "../constants/Colors";

export const IndexStyle = StyleSheet.create({
    main:{
        backgroundColor:Colors.background,
        flex:1,
        width:"100%",
        justifyContent:"center",
        alignItems:"center"
    },
    button:{
        backgroundColor:Colors.heading, width:"90%", justifyContent:"center", alignItems:"center", paddingVertical:10, borderRadius:10, marginBottom:50
    }
})