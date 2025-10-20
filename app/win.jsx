import { useAudioPlayer } from 'expo-audio'
import { router } from 'expo-router'
import LottieView from 'lottie-react-native'
import { useEffect } from 'react'
import { Linking, Text, TouchableOpacity, View } from 'react-native'
import Success from "../assets/audio/Success.mp3"
import Happy from "../assets/pictures/Happy.json"
import { Colors } from './constants/Colors'
import SafeArea from './constants/SafeArea'
import { MainStyle } from './styles/MainStyle'

const Win = () => {

  const player = useAudioPlayer(Success);

  useEffect(()=>{
    player.play();
  },[])

   return (
<View style={{flex:1, backgroundColor:Colors.background}}>
      <SafeArea>
              <View style={{width:"90%", flex:2, alignSelf:"center", alignItems:
                "center", justifyContent:"space-between",
              }}>
                <Text style={{fontSize:30, fontWeight:"500", marginTop:20, color:Colors.correct}}>Congratulation</Text>
                <Text style={{fontSize:20, fontWeight:"500", marginTop:20}}>High Score: 00</Text>
                 <Text style={{fontSize:20, fontWeight:"500", marginTop:10, color:Colors.correct, alignSelf:"center"}}>
                  Title: </Text>

                <LottieView 
                  source={Happy}
                  autoPlay
                  style={{height:"100%", width:"100%"}}
                ></LottieView>
              </View>
               
               <View style={{alignSelf:"center", flex:1, justifyContent:"center", width:
                "90%", alignItems:"center"
               }}>
                   <TouchableOpacity style={MainStyle.btn} onPress={()=>Linking.openURL("https://saketfolio.netlify.app/")} >
                      <Text style={{fontSize:20, color:"black"}}>Follow Developer</Text>
                   </TouchableOpacity>
                    <TouchableOpacity onPress={()=>router.replace("/")}>
                      <Text style={{fontSize:16, color:"#EF4444", marginTop:20}}>Play Again</Text>
                   </TouchableOpacity>
               </View>
      </SafeArea>
</View>
  )
}

export default Win