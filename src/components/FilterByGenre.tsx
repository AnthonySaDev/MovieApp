import React, {useState} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import {genres} from '../api/genres';
export default function FilterByGenre(props: any) {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [buttonText, setButtonText] = useState('Selecione um gênero:');

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setOpenModal(!openModal)}>
        <Text style={styles.label}>{selectedGenre===null?'Selecione um gênero:': buttonText}</Text>
      </TouchableOpacity>
      {openModal && (
        <View style={styles.genreContainer}>
          <TouchableOpacity
            style={[
              styles.genreButton,
              selectedGenre === null && styles.selectedGenreButton,
            ]}
            onPress={() => {
              setOpenModal(!openModal);
              setButtonText('Selecione um gênero:');
              setSelectedGenre(null);
              props.GetMoviesByGenre(null, 0);
            }}>
            <Text
              style={[
                styles.genreText,
                selectedGenre === null && styles.selectedGenreText,
              ]}>
              Limpar
            </Text>
          </TouchableOpacity>
          {Object.entries(genres).map(([id, name]: any) => (
            <TouchableOpacity
              key={id}
              style={[
                styles.genreButton,
                selectedGenre === id && styles.selectedGenreButton,
              ]}
              onPress={() => {
                setOpenModal(!openModal);
                setButtonText(genres[id]);
                setSelectedGenre(id);
                props.GetMoviesByGenre(id, 1);
              }}>
              <Text
                style={[
                  styles.genreText,
                  selectedGenre === id && styles.selectedGenreText,
                ]}>
                {name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: SPACING.space_20,
    width: '70%',
    alignSelf: 'center',
  },
  label: {
    fontSize: FONTSIZE.size_16,
    color: COLORS.White,
    fontFamily: FONTFAMILY.poppins_medium,
    textAlign: 'center',
    marginBottom: SPACING.space_2,
    backgroundColor: COLORS.Orange,
    padding: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_25,
  },
  genreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: COLORS.WhiteRGBA15,
  },
  genreButton: {
    padding: SPACING.space_8,
    margin: SPACING.space_4,
    width: '45%',
  },
  selectedGenreButton: {
    backgroundColor: COLORS.Grey,
  },
  genreText: {
    fontSize: FONTSIZE.size_12,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: 'white',
    textAlign: 'center',
  },
  selectedGenreText: {
    color: 'white',
  },
});
