import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import React from 'react';
import CustomIcon from './CustomIcon';
import {BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';

export default function AppHeader(props: any) {
  return (
    <View style={styles.container}>
      <TouchableOpacity  style={styles.iconBG} onPress={props.action}>
        <CustomIcon name={props.name} style={styles.icon} />
      </TouchableOpacity>
      <Text style={styles.headerText}>{props.header}</Text>
      <View style={styles.empty}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    color: COLORS.White,
    fontSize: FONTSIZE.size_24,
  },
  headerText: {
    flex: 1,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_20,
    textAlign: 'center',
    color: COLORS.White,
  },
  empty: {
      height:SPACING.space_20*2,
      width:SPACING.space_20*2
  },
  iconBG:{
    height:SPACING.space_20*2,
    width:SPACING.space_20*2,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:BORDERRADIUS.radius_20,
    backgroundColor:COLORS.Orange,
    
}
});
