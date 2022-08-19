// Registration.js

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
const Registration = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Register Screen</Text>
      <TouchableOpacity
        style={{
          ...styles.registerLink,
        }}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.registerLinkTitle}>Login? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Registration;
