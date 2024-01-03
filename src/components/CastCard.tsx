import React from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import {BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';

export default function CastCard(props: any) {
  return (
    <View
      style={[
        styles.container,
        props.shoudlMarginatedAtEnd
          ? props.isFirst
            ? {marginLeft: SPACING.space_24}
            : props.isLast
            ? {marginRight: SPACING.space_24}
            : {}
          : {},
          {maxWidth:props.cardWidth}
      ]}>
      <Image source={{uri: props.imagePath}} style={[styles.cardImage, {width:props.cardWidth}]} />
      <Text style={styles.title} numberOfLines={1}>
        {props.title}
      </Text>
      <Text style={styles.subTitle} numberOfLines={1}>
        {props.subTitle}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  cardImage: {
    aspectRatio: 1920 / 2880,
    borderRadius: BORDERRADIUS.radius_25*4,
  },
  title: {
    alignSelf: 'stretch',
    fontFamily:FONTFAMILY.poppins_medium,
    fontSize:FONTSIZE.size_12,
    color:COLORS.White,
  },
  subTitle: {
    alignSelf: 'center',
    fontFamily:FONTFAMILY.poppins_medium,
    fontSize:FONTSIZE.size_10,
    color:COLORS.WhiteRGBA50,
  },
});
