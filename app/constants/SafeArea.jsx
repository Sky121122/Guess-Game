import { SafeAreaView } from 'react-native-safe-area-context'

export default function SafeArea({children}) {
  return (
   <SafeAreaView style={{flex:1, width:"100%", paddingHorizontal:5}}>
    {children}
   </SafeAreaView>
  )
}