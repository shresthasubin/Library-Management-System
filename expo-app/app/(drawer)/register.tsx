import React, {useState} from 'react'
import { View, Text, TextInput, Pressable, Image, ActivityIndicator } from 'react-native'
import { StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker'
import axios from 'axios'
import Toast from 'react-native-toast-message'

const register = () => {
    const [show, setShow] = useState(false)
    // const [name, setName] = useState('')
    // const [email, setEmail] = useState('')
    // const [password, setPassword] = useState('')
    // const [role, setRole] = useState('')
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'borrower'
    })
    const router = useRouter()
    const [profileImage, setProfileImage] = useState<string | null>(null)
    const handleNavigate = () => {
        router.push('/(drawer)/login')
    }

    const handleImage = async () => {

    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
        alert("Permission to access gallery is required!");
        return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'images',
        allowsEditing: true,
        quality: 1,
        base64: false,
    });

    if (!result.canceled) {
        setProfileImage(result.assets[0].uri);
    }
};

   const handleSubmit = async () => {
    // Validate fields
    if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim()) {
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
        data.append('name', formData.name);
        data.append('email', formData.email);
        data.append('password', formData.password);
        data.append('role', formData.role);
        
        // console.log('running2')
       if (profileImage) {
            let localUri = profileImage;
            if (!localUri.startsWith('file://')) {
                localUri = 'file://' + localUri;
            }

            const filename = localUri.split('/').pop();
            const match = /\.(\w+)$/.exec(filename!);
            const type = match ? `image/${match[1].toLowerCase()}` : 'image/jpeg';

            data.append('profileImage', {
                uri: localUri,
                name: filename,
                type: type,
            } as any);
        }
        // console.log(profileImage)
        // console.log('running3')
        
        // Make API request
        const res = await axios.post(
            'https://lms-backend-5cm5.onrender.com/api/user/register',
            data,
            {withCredentials: true,
            headers: {'Content-Type': 'multipart/form-data'}}
        );
        // console.log(res.data.data)
        // console.log('running4')
        
        if (res.data.data) {
            Toast.show({
                type: 'success',
                text1: 'Success!',
                text2: 'Registered Successfully'
            });
            router.push('/(drawer)/login');
        } else {
            Toast.show({
                type: 'error',
                text1: 'Error!',
                text2: 'Registration failed'
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
        <View className='w-full flex flex-col items-center gap-[3px]'>
            <View className='w-[70px] h-[70px] rounded-full border-2 border-white flex justify-center items-center'>
                {
                profileImage ?
                <Image source={{uri: profileImage}} className='w-full h-full rounded-full'/>
                :
                <Ionicons name="person" size={24} color='white'/>
                }
            </View>
            <Text className='text-[#f1f1f1] font-bold' onPress={handleImage}>Set Profile Image</Text>
        </View>
        <Text className='text-[#f1f1f1] font-bold'>Name</Text>
        <TextInput
            value={formData.name}
            onChangeText={(text) => setFormData({...formData, name: text})}
            placeholder='John Doe'
            placeholderTextColor='#b5b5b5ff'
            className='border-2 text-[#f1f1f1] font-medium rounded-[8px] border-white px-[12px] py-[6px]'
        />
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
        <Text className='text-[#f1f1f1] font-bold'>Role</Text>
        <TextInput
            value={formData.role}
            placeholder='role'
            placeholderTextColor='#b5b5b5ff'
            className='border-2 text-[#f1f1f1] font-medium rounded-[8px] border-white px-[12px] py-[6px]'
            editable = {false}
        />
        <Pressable className='w-full rounded-[24px] bg-green-600 flex justify-center items-center h-[30px] mt-[12px]' onPress={handleSubmit}>
            {
                loading ?
                (
                    <ActivityIndicator size="small" color="#e5e4e4ff"/>
                ) : (
                    <Text className='text-[#f1f1f1] font-bold' >Register</Text>
                )
            }
        </Pressable>
        <Text className='text-[#f1f1f1] underline self-center mt-[12px]' onPress={handleNavigate}>Already have an account? <Text className='font-bold'>Sign In</Text></Text>
      </View>
    </View>
  )
}

export default register

const styles = StyleSheet.create({
    bg: {
        backgroundColor: '#3a3939a0'
    }
})