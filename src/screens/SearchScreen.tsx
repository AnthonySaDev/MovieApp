import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {COLORS, FONTSIZE, SPACING} from '../theme/theme';
import SubMovieCard from '../components/SubMovieCard';
import {baseImagePath, filterByGenre, searchMovies} from '../api/apicalls';
import InputHeader from '../components/InputHeader';
import FilterByGenre from '../components/FilterByGenre';
import CustomIcon from '../components/CustomIcon';

const {width, height} = Dimensions.get('screen');

const SearchScreen = ({navigation, props}: any) => {
  const [searchList, setSearchList] = useState([]);
  const [page, setPage] = useState(1);
  const [genre, setGenre] = useState(null);
  const [paginationVisible, setPaginationVisible] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const searchMoviesFunction = async (name: string) => {
    setPage(1);
    setPaginationVisible(false);
    try {
      let response = await fetch(searchMovies(name || props.searchText));
      let json = await response.json();
      setSearchList(json.results);
    } catch (error) {
      console.log('Erro ao buscar filme: ' + error);
    }
  };

  useEffect(() => {
    GetMoviesByGenre(genre);
    flatListRef.current?.scrollToOffset({animated: true, offset: 0});
  }, [page]);
  useEffect(() => {
    setPage(1);
  }, [genre]);

  const GetMoviesByGenre = async (genre: any) => {
    setGenre(genre);
    setPaginationVisible(true);
    if (genre == null || page == 0) {
      setSearchList([]);
      return;
    }
    try {
      let response = await fetch(filterByGenre(genre, page));
      let json = await response.json();
      setSearchList(json.results);
    } catch (error) {
      console.log('Erro ao buscar filme: ' + error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <FlatList
        data={searchList}
        ref={flatListRef}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        bounces={false}
        ListHeaderComponent={
          <View style={styles.InputHeaderContainer}>
            <InputHeader searchFunction={searchMoviesFunction} />
            <FilterByGenre GetMoviesByGenre={GetMoviesByGenre} />
          </View>
        }
        ListEmptyComponent={
          <View>
            <Text
              style={{
                color: COLORS.White,
                textAlign: 'center',
                fontSize: FONTSIZE.size_20,
              }}>
              Nenhum filme encontrado
            </Text>
          </View>
        }
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.centerContainer}
        renderItem={({item, index}) => (
          <SubMovieCard
            shoudlMarginatedAtEnd={false}
            shouldMarginatedAround={true}
            cardFunction={() => {
              navigation.push('MovieDetails', {movieId: item.id});
            }}
            cardWidth={width / 2 - SPACING.space_12 * 2}
            title={item.title}
            imagePath={baseImagePath('w342', item.poster_path)}
          />
        )}
      />
      {paginationVisible && (
        <View style={styles.paginationContainer}>
          <TouchableOpacity
            disabled={genre == null || page <= 1}
            onPress={() => setPage(page - 1)}>
            <CustomIcon name="arrow-left" color={COLORS.Orange} size={20} />
          </TouchableOpacity>
          <Text style={{color: COLORS.White}}>{page}</Text>
          <TouchableOpacity
            disabled={genre == null || page >= 100}
            onPress={() => setPage(page + 1)}>
            <CustomIcon name="arrow-right" color={COLORS.Orange} size={20} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    width,
    alignItems: 'center',
    backgroundColor: COLORS.Black,
  },
  InputHeaderContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_28,
    marginBottom: SPACING.space_28 - SPACING.space_12,
  },
  centerContainer: {
    alignItems: 'center',
  },
  paginationContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.space_24,
    paddingVertical: SPACING.space_8,
  },
});

export default SearchScreen;
