import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import SafeArea from './constants/SafeArea';
import { MainStyle } from './styles/MainStyle';

import { useEffect, useState } from 'react';
import Correct from "../assets/pictures/Correct.json";
import Crying from "../assets/pictures/Crying.json";
import Wrong from "../assets/pictures/Wrong.json";
import Five from "../assets/pictures/five.jpg";
import Four from "../assets/pictures/four.jpg";
import One from "../assets/pictures/one.jpg";
import Three from "../assets/pictures/three.jpg";
import Two from "../assets/pictures/two.jpg";

import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import { Colors } from './constants/Colors';
import { Countries } from './data/Countries';

const Home = () => {

  const router = useRouter();

  const [imgCounter, setImgCounter] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [options, setOptions] = useState([]);
  const [result, setResult] = useState(null);
  const [score, setScore] = useState(0);
  const [wrongOpt, setWrongOpt] = useState(0); 
  const [highScore , setHighScore] = useState(0);

  // ---------- change image on counter change --------- 
  let imgSrc;
if(imgCounter >= 0 && imgCounter < 10){
  imgSrc = One;
} else if(imgCounter >= 10 && imgCounter <20){
  imgSrc = Two;
}  else if(imgCounter >= 20 && imgCounter <30){
  imgSrc = Three;
} else if(imgCounter >= 30 && imgCounter <40){
  imgSrc = Four;
} else if(imgCounter >= 40 && imgCounter <50){
  imgSrc = Five;
} else if(imgCounter >= 50 && imgCounter <60){
  imgSrc = Two;
}  else if(imgCounter >= 60 && imgCounter <70){
  imgSrc = Three;
} else if(imgCounter >= 70 && imgCounter <80){
  imgSrc = Four;
} else if(imgCounter >= 80 && imgCounter <90){
  imgSrc = Five;
} else if(imgCounter >= 90 && imgCounter <100){
  imgSrc = Two;
}  else if(imgCounter == 100){
  imgSrc = Three;
}

  useEffect(()=>{
    genCountry();
    getHighScore();
  },[]);

  const getHighScore = async () =>{
    const newHighScore = await AsyncStorage.getItem("highScore");
    await setHighScore(newHighScore);
  };

  const settingHighScore = async () =>{
    if(score > highScore){
      await AsyncStorage.setItem("highScore", String(score));
    }
  };  

  // -------------- code for genertae random country ---------- 
  const genCountry = () =>{
    const randIndex = Math.floor(Math.random() * Countries.length);
    const getCountry = Countries[randIndex];
    setSelectedCountry(getCountry);

// ====== for pick 4 random country data ===========    
    let opts = [getCountry];
    while(opts.length < 4 ){
      const random = Countries[Math.floor(Math.random() * Countries.length)];
      if(!opts.some(o=>o.id == random.id)){
        opts.push(random);
      }
    }  

// ---------- for suffle those options -----------
    const suffledOpts = opts.sort(()=> Math.random() - 0.5 );
    setOptions(suffledOpts);
  }


// ----- handle button ----------- 
const handleBtn = (opt) =>{  
  if(opt.correctOpt == selectedCountry.correctOpt){
      setResult("correct");
      setScore(score+1);
      setImgCounter(imgCounter+1);      

      if(score == 100){
       return router.replace("/win");
      }

}else {
    setResult("wrong");
    setWrongOpt(wrongOpt+1);
    if(wrongOpt >=3){
      settingHighScore();
     return router.replace({
      pathname:"/wrong",
      params:{score: score}
     });
    }
  }
  // -------- again genertate new country -------- 
    setTimeout(()=>{
      genCountry();
      setResult(null);
    },2000);
}
// ---- compare rank ---------------- 
const getRank = (score) => {
  if(score == 0) return "Your Rank"
  if (score > 0 && score < 5) return "🧭 Beginner Explorer";
  if (score < 10) return "🧳 Rookie Traveler";
  if (score < 15) return "🏁 Flag Learner";
  if (score < 20) return "🔭 World Observer";
  if (score < 25) return "🌎 Globe Spotter";
  if (score < 30) return "🗺️ Cultural Explorer";
  if (score < 40) return "🏆 Flag Master";
  if (score < 50) return "🌟 World Genius";
  if (score < 75) return "🦸 Global Hero";
  return "👑 Ultimate Flag Legend";
};

  return (
    <View style={MainStyle.main}>
      <StatusBar barStyle={"light-content"} hidden ></StatusBar>
        <Image source={imgSrc} style={MainStyle.images}></Image>

      <SafeArea>
{/* ----------- score board ---------------------------------------------  */}
        <View style={MainStyle.score}>
          <View style={{display:"flex", flexDirection:"row",gap:3}}>
             {[...Array(3)].map((_, i) => (
              <Text key={i} style={{ fontSize: 24 }}>
                {i < 3 - wrongOpt ? "❤️" :
                 (<LottieView
                    source={Crying}
                    autoPlay
                    style={{width:34, height:34}}
                ></LottieView>)}
              </Text>
               ))}
          </View>
          <View>
            <Text style={{fontSize:18, fontWeight:"600"}}>Score: 
              <Text style={{color:Colors.correct, fontSize:20, fontWeight:"600"}}> 0{score}</Text>
            </Text>
          </View>
        </View>

{/* ----------------------- main container ------------------  */}
            <View style={MainStyle.container}>
               <Image
                source={{ uri: selectedCountry?.flag }}
                style={{ width: 250, height: "75%", marginVertical: 20 }}
                resizeMode="contain"
              />

               <View style={{width:"100%", alignSelf:"center", justifyContent:"center", alignItems:"center", height:"100%", position:"absolute"}} >
                {
                  result === "correct" &&  <LottieView
                  source={Correct}
                  style={{width:"100%", height:"100%"}}
                  autoPlay
                  loop={false}
                ></LottieView>
                }
                {
                result === "wrong" &&  <LottieView
                  source={Wrong}
                  style={{width:"100%", height:"100%"}}
                  autoPlay
                  loop={false}
                ></LottieView>
                }
               
              </View>
            </View>
{/* ----------------------- button container ------------------  */}
            <View style={MainStyle.buttons}>
              {
                options.map((opt)=>(
                      <TouchableOpacity key={opt.id} style={MainStyle.btn} 
                      onPress={()=>handleBtn(opt)}>
                        <Text style={{fontSize:20, color:"black"}}>{opt.country}</Text>
                      </TouchableOpacity>
                ))
              }
                
            </View>

<View style={MainStyle.progress}>
  <Text style={{fontSize:18, fontWeight:"600"}}>Title : 
    <Text style={{color:Colors.correct, fontSize:16, fontWeight:"400"}}>{getRank(score)}</Text>
  </Text>
</View>
     
      </SafeArea>
    </View>
  )
}

export default Home