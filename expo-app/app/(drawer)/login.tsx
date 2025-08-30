import React, {useState} from 'react'
import { View, Text, TextInput, Pressable, Image, ActivityIndicator } from 'react-native'
import { StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import Toast from 'react-native-toast-message'

const login = () => {
    const [show, setShow] = useState(false)
    // const [name, setName] = useState('')
    // const [email, setEmail] = useState('')
    // const [password, setPassword] = useState('')
    // const [role, setRole] = useState('')
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const router = useRouter()
    const handleNavigate = () => {
        router.push('/(drawer)/login')
    }

   const handleSubmit = async () => {
    // Validate fields
    if (!formData.email.trim() || !formData.password.trim()) {
        Toast.show({
            type: 'error',
            text1: 'Error!',
            text2: 'Please fill all the fields'
        });
        return;
    }

    setLoading(true);

    try {
        const data = new FormData();
        // console.log('running1')
        data.append('email', formData.email);
        data.append('password', formData.password);
        
        
        const res = await axios.post(
            'https://lms-backend-5cm5.onrender.com/api/auth/login',
            {
                email: formData.email,
                password: formData.password
            }
        );

        const token = res.data.data.token
        const user = res.data.data.userExist
        // console.log(res.data.data)
        // console.log('running4')
        await AsyncStorage.setItem('token', token)
        await AsyncStorage.setItem('user', JSON.stringify(user))
        
        if (token) {
            Toast.show({
                type: 'success',
                text1: 'Success!',
                text2: 'Login Successfully'
            });
            router.push('/(drawer)/(tabs)/home');
        } else {
            Toast.show({
                type: 'error',
                text1: 'Error!',
                text2: 'Login failed'
            });
        }
    } catch (error: any) {
        console.log(error.response?.data?.message || error.message)
        Toast.show({
            type: 'error',
            text1: 'Error!',
            text2: error.response?.data?.message || 'Something went wrong',
        });
    } finally {
        setLoading(false);
    }
};


  return (
    <View className='w-screen h-screen bg-slate-800 flex justify-center items-center'>
        <Image source={require('../../assets/images/image.png')} className='absolute w-screen h-screen'/>
      <View className='w-[350px] px-[12px] py-[24px] rounded-[12px] flex flex-col gap-[8px]' style={styles.bg}>
        <Text className='text-[#f1f1f1] font-bold'>Email</Text>
        <TextInput
            value={formData.email}
            onChangeText={(text) => setFormData({...formData, email: text})}
            placeholder='johndoe@gmail.com'
            placeholderTextColor='#b5b5b5ff'
            className='border-2 text-[#f1f1f1] font-medium rounded-[8px] border-white px-[12px] py-[6px]'
        />
        <Text className='text-[#f1f1f1] font-bold'>Password</Text>
        <View className='relative'>
            <TextInput
                value={formData.password}
                onChangeText={(text) => setFormData({...formData, password: text})}
                secureTextEntry = {show ? false : true}
                placeholder='********'
                placeholderTextColor='#b5b5b5ff'
                className='border-2 text-[#f1f1f1] font-medium rounded-[8px] border-white px-[12px] py-[6px]'
            />
            {   
                show?
                <Ionicons name='eye' size={18} color='#c1c1c1ff' className='absolute right-[12px] top-[25%]' onPress={() => setShow(!show)}/>
                :
                <Ionicons name='eye-off' size={18} color='#c1c1c1ff' className='absolute right-[12px] top-[25%]' onPress={() => setShow(!show)}/>
            }
        </View>
        <Pressable className='w-full rounded-[24px] bg-green-600 flex justify-center items-center h-[30px] mt-[12px]' onPress={handleSubmit}>
            {
                loading ?
                (
                    <ActivityIndicator size="small" color="#e5e4e4ff"/>
                ) : (
                    <Text className='text-[#f1f1f1] font-bold' >Login</Text>
                )
            }
        </Pressable>
        <Text className='text-[#f1f1f1] underline self-center mt-[12px]' onPress={handleNavigate}>Already have an account? <Text className='font-bold'>Register</Text></Text>
      </View>
    </View>
  )
}

export default login

const styles = StyleSheet.create({
    bg: {
        backgroundColor: '#3a3939a0'
    }
})