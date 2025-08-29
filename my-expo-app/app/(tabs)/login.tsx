import React, {useState} from 'react'
import { View, Text, TextInput, TouchableOpacity, } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import axios from 'axios';
import mime from 'mime-type'

const login = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const role = 'borrower'
    const [profileImage, setProfileImage] = useState<string | null>(null)

    const handleSubmit = async() => {
        const data = new FormData()
        data.append('name',name),
        data.append('email',email)
        data.append('password', password)
        data.append('role', role)
        if (profileImage) {
            data.append('profileImage', {
                uri: profileImage,
                name: 'profile' + new Date(Date.now()) + 'image/*'[1]
            } as any)
        }
        try {
            await axios.post('http://localhost:3000/api/user/register', data, {
                headers: {'Content-Type': 'multipart/form-data'},
                withCredentials: true
            })
            setName('')
            setEmail('')
            setPassword('')
        } catch(error) {
            console.log(error)
        }
    }
    const imagePicker = async() => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (!permission.granted) {
            alert('permission to access gallery is required');
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1,1],
            quality: 1
        })

        if (!result.canceled) {
            console.log(result)
            setProfileImage(result.assets[0].uri)
        }
    }
  return (
    <View>
        <Text>Name</Text>
        <TextInput/>
    </View>
  )
}

export default login

