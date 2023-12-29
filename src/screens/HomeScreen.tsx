import React from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import { COLORS } from '../theme/theme'

const HomeScreen = ({navigation}: any) => {
  
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() =>  {
          navigation.push('MovieDetails')
        }}><Text>IR</Text></TouchableOpacity>
        <Text>HomeScreen</Text>
      </View>
    )
  
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: COLORS.White,
    color: COLORS.White,
  }
})

export default HomeScreen;