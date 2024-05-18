import React from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export const TextColorPicker = ({ selectedColor, onColorSelect }:any) => {
  const colors = ['#fff', '#111', '#b30000', '#ee82ee', '#ff4500', '#ff8c00', '#ffd700', '#90ee90', '#00ced1', '#1e90ff', '#c71585', '#663399', '#32cd32', '#ff1493', '#4682b4', '#2e8b57', '#8a2be2', '#da70d6', '#dc143c', '#ffd700', '#ff69b4'];

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.ColorPickerContainer}>
      {colors.map((color, index) => (
        <TouchableOpacity key={index} onPress={() => onColorSelect(color)} style={styles.ColorContent}>
          <View style={{
            width: color === selectedColor ? 40 : 35,
            height: color === selectedColor ? 40 : 35,
            backgroundColor: color,
            marginLeft: 10,
            opacity: color === selectedColor ? 1 : 0.2,
            borderColor: '#000', 
            borderWidth: 0.2,
          }} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  ColorPickerContainer: {
    flexDirection: 'row',
  },
  ColorContent:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});