// src/screens/ProfileScreen.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { images } from '../assets/images'; // pastikan images.logo ada

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={images.logo} style={styles.avatar} />

      <Text style={styles.name}>Roni Paslan</Text>
      <Text style={styles.bio}>Frontend Developer | React Native Enthusiast</Text>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button}>
          <Icon name="settings-outline" size={22} color="#FF6B81" />
          <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Icon name="log-out-outline" size={22} color="#FF6B81" />
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 80,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
  },
  bio: {
    fontSize: 14,
    color: 'gray',
    marginVertical: 10,
  },
  buttons: {
    marginTop: 40,
    width: '80%',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5F6',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginVertical: 8,
  },
  buttonText: {
    fontSize: 16,
    color: '#FF6B81',
    marginLeft: 10,
    fontWeight: '600',
  },
});

export default ProfileScreen;
