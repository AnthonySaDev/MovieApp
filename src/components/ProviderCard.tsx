import React from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import {BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';

export default function ProviderCard(props: any) {
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
      <Text style={styles.title} numberOfLines={2}>
        {props.title}
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  cardImage: {
    aspectRatio: 19 / 20,

  },
  title: {
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily:FONTFAMILY.poppins_medium,
    fontSize:FONTSIZE.size_12,
    color:COLORS.White,
    marginTop: SPACING.space_8,
  },
});
