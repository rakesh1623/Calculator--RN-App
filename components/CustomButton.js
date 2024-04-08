// CustomButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomButton = ({ title, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#141c22', 
    padding: 4,
    borderRadius: 100,
    width:57,
    height:57,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    
  },
  text: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight:'bold'

  },
});

export default CustomButton;
