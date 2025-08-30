import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, {useEffect, useState} from "react";
import { View, Text, TextInput, ScrollView, Pressable, Image } from "react-native";
 
const Home = () => {
  const [search, setSearch] = useState('')
  const [books, setBooks] = useState<any[]>([])
  const regex = new RegExp(search, 'i')

  const fetchBook = async () => {
    try {
      const token = await AsyncStorage.getItem('token')
      const res = await axios.get('https://lms-backend-5cm5.onrender.com/api/book/get', {headers: {Authorization: `Bearer ${token}`}})
      setBooks(res.data.data)
    } catch(error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchBook()
  }, [])

  return(
    <View className="bg-white">
      <View className="w-full flex justify-center items-center mt-[4px]">
        <TextInput
            value={search}
            onChangeText={(text) => setSearch(text)}
            placeholder='Search books here...'
            placeholderTextColor='#b5b5b5ff'
            className='w-[350px] border-2 text-[#888] font-medium rounded-[8px] border-[#888] px-[12px] py-[6px]'
        />
      </View>
      <Text className="mx-[12px] mt-[12px] font-bold text-[16px] text-[#888]">Books</Text>
      <ScrollView>
        <View className="flex flex-row flex-wrap gap-[12px] bg-[#F5F5F5] h-full mx-[12px] mt-[12px] px-[6px] pt-[12px] mb-[100px]">
          { 
            books
            .filter((book) => (regex.test(book.title) || regex.test(book.author)))
            .map((book:any) => {
              return <View key={book._id} className="w-[180px] h-[250px] bg-red-300 p-[12px] flex flex-col gap-[4px] relative rounded-[12px]">

            <Image source={{uri: book.bookImage}} className="absolute z-1 w-[180px] h-[250px] top-0 rounded-[12px]"/>
            <View className="absolute z-2 w-[180px] h-[250px] top-0 rounded-[12px]" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}/>

            <View className="z-3 flex flex-col gap-[4px] absolute bottom-[4px] left-[8px]">

              <Text className="text-white font-bold text-xl">{book.title}</Text>

              <Text className="text-[#f5f5f5] font-medium text-lg italic">{book.author}</Text>

              <View className="bg-green-600 w-[130px] px-[12px] py-[2px] rounded-[12px] "><Text className="text-[12px] font-medium text-white">Available: {book.available}/{book.quantity}</Text></View>

              <View className="bg-yellow-600 w-[70px] px-[12px] py-[2px] rounded-[12px] gap-[8px] flex flex-row justify-center items-center"><Ionicons name='star' size={14} color='white'/><Text className=" text-[12px] font-medium text-white">{book.rating}</Text></View>

              <Pressable className=" h-[24px] w-[160px] flex justify-center items-center">
                <Text className="font-bold text-white bg-green-600 w-full text-center rounded-[20px]">Borrow</Text>
              </Pressable>
            </View>
            </View>
            })
            
          }
        </View>
      </ScrollView>

    </View>
  )
};
 
export default Home;