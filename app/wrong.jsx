import AsyncStorage from "@react-native-async-storage/async-storage"
import { useAudioPlayer } from 'expo-audio'
import { useLocalSearchParams, useRouter } from 'expo-router'
import LottieView from 'lottie-react-native'
import { useEffect, useState } from 'react'
import { Linking, Text, TouchableOpacity, View } from 'react-native'
import Gameover from "../assets/audio/Gameover.mp3"
import Cry from "../assets/pictures/Cry.json"
import { Colors } from './constants/Colors'
import SafeArea from './constants/SafeArea'
import { MainStyle } from './styles/MainStyle'


const Wrong = () => {
  const router = useRouter();
  const player = useAudioPlayer(Gameover);
  const {score} = useLocalSearchParams();
  const [highScore , setHighScore] = useState(0);

  const handleReset = ()  => {
    router.replace("/");
  }

  const getHighScore =async () =>{
    const newHighScore = await AsyncStorage.getItem("highScore");
    await setHighScore(newHighScore);
    
  }

  useEffect(()=>{
    getHighScore();
    player.play();
  },[])

  return (
<View style={{flex:1, backgroundColor:Colors.background}}>
      <SafeArea>
              <View style={{width:"90%", flex:2, alignSelf:"center", alignItems:
                "center", 
              }}>
                <Text style={{fontSize:20, fontWeight:"500", marginTop:20}}>High Score: 0{highScore}</Text>
                <Text style={{fontSize:20, fontWeight:"500", marginTop:20}}>Your Score: 0{score}</Text>
                <LottieView 
                  source={Cry}
                  autoPlay
                  style={{height:"100%", width:"100%"}}
                ></LottieView>
              </View>
               <View style={{alignSelf:"center", flex:1, justifyContent:"center", width:
                "90%", alignItems:"center"
               }}>
                   <TouchableOpacity style={MainStyle.btn} onPress={handleReset}>
                      <Text style={{fontSize:20, color:"black"}}>Restart</Text>
                   </TouchableOpacity>
                    <TouchableOpacity onPress={()=>Linking.openURL("https://saketfolio.netlify.app/")}>
                      <Text style={{fontSize:16, color:"#EF4444", marginTop:20}}>Follow Developer</Text>
                   </TouchableOpacity>
               </View>
      </SafeArea>
</View>
  )
}

export default Wrong