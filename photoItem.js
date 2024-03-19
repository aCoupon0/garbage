import React from 'react';
import { Image, StyleSheet } from 'react-native';

export default function PhotoItem({ source }) {
  return <Image source={source} style={styles.photoItem} />;
}

const styles = StyleSheet.create({
  photoItem: {
    width: 350,
    height: 350,
    margin: 10,
    marginTop: 20,
    borderRadius: 15
  },
});
