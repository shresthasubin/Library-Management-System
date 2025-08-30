// import { Text, View, TextInput } from "react-native";
import '../global.css'
// import { useState } from "react";

// export default function Index() {
//   const [text, setText] = useState('')
//   return (
//     <View
//       style={{
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//       }}

//       className="bg-slate-700"
//     >
//       <Text className="text-2xl text-white font-bold">Hello, From Admin </Text>
//       <Text className="text-lg text-purple-400 font-medium">Welcome to Expo tour </Text>
//       <TextInput className="border-2 w-[300px] text-xl mt-[4px] rounded-[24px] border-white text-white placeholder:text-white p-[18px]" placeholder="Type your name.." value={text} onChangeText={(value) => setText(value)}/>

//       <Text className={`font-bold text-white text-3xl mt-[12px]`}>Hello, <Text className={`${text?'text-green-600':'text-white'}`}>{`${text || 'Guest'}`}</Text>!</Text>
      
//     </View>
//   );
// }


import { Redirect } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";


const index = () => {
  return (
    <>
      <Redirect href={"/(drawer)/register"}/>
    </>
  )
}

export default index;
const styles = StyleSheet.create({})
