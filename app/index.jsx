import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { IndexStyle } from "../app/styles/IndexStyle";
import Flag from "../assets/pictures/IndianFlag.json";
import Loading from "../assets/pictures/Loading.json";
import { Colors } from "./constants/Colors";

export default function Index() {
const router = useRouter();

useEffect(()=>{
  const timer = setTimeout(()=>{
    router.replace("/home");
  }, 4000);
  return () => clearTimeout(timer);
},[])


  return (
    <View style={IndexStyle.main}>
        <View style={IndexStyle.button}>
           <Text style={{fontSize:32, color:Colors.accent, fontWeight:"500"}}>Guess The Flag</Text>
         </View>
     <View style={{width:"100%", alignSelf:"center", justifyContent:"center", alignItems:"center", height:"50%"}} >      
       <LottieView
        style={{flex:1, width:"90%"}}
        source={Flag}
        autoPlay
        loop={false}
      />
     </View>
      <LottieView
        style={{width:"100%", height:100}}
        source={Loading}
        autoPlay
        loop={true}
      />
    </View>
  );
}
