import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  const fetchUser = async () => {
    try {
      const userData = await AsyncStorage.getItem("user");
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.log("Failed to load user:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // Logout function
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token"); 
      await AsyncStorage.removeItem("user");  
      router.replace("/login");
    } catch (error) {
      console.log("Logout failed:", error);
    }
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Loading user...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: user.profileImage
        }}
        style={styles.profileImage}
      />

      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.info}>Email: {user.email}</Text>
      <Text style={styles.info}>Role: {user.role}</Text>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    paddingTop: 50,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    backgroundColor: "#ccc",
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },
  info: {
    fontSize: 16,
    color: "#555",
    marginBottom: 4,
  },
  logoutButton: {
    marginTop: 40,
    backgroundColor: "#E53935",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
