import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  StatusBar,
  ScrollView,
  FlatList,
} from 'react-native';
import {COLORS, SPACING} from '../theme/theme';
import {
  upComingMovies,
  nowPlayingMovies,
  popularMovies,
  baseImagePath,
  searchMovies,
} from '../api/apicalls';
import InputHeader from '../components/InputHeader';
import CategoryHeader from '../components/CategoryHeader';
import SubMovieCard from '../components/SubMovieCard';
import MovieCard from '../components/MovieCard';

const {width, height} = Dimensions.get('window');

const getMovies = async (type: string) => {
  try {
    let response = await fetch(type);
    let json = await response.json();
    return json;
  } catch (error) {
    console.log(
      'Algo deu errado com o getMovies no ' + type + ' e o erro foi: ' + error,
    );
  }
};

const HomeScreen = ({navigation}: any) => {
  const [nowPlayingMoviesList, setNowPlayingMoviesList] =
    useState<any>(undefined);
  const [upComingMoviesList, setUpComingMoviesList] = useState<any>(undefined);
  const [popularMoviesList, setPopularMoviesList] = useState(undefined);

  useEffect(() => {
    getMovies(nowPlayingMovies).then(data => {
      setNowPlayingMoviesList([
        {id: 'dummy1'},
        ...data.results,
        {id: 'dummy2'},
      ]);
    });
    getMovies(upComingMovies).then(data => {
      setUpComingMoviesList(data.results);
    });
    getMovies(popularMovies).then(data => {
      setPopularMoviesList(data.results);
    });
  }, []);

  const searchMoviesFunction = () => {
    navigation.navigate('Search');
  };

  if (
    nowPlayingMoviesList == undefined &&
    nowPlayingMoviesList == null &&
    upComingMoviesList == undefined &&
    upComingMoviesList == null &&
    popularMoviesList == undefined &&
    popularMoviesList == null
  ) {
    return (
      <ScrollView
        style={styles.container}
        bounces={false}
        contentContainerStyle={styles.scrollViewContainer}>
        <StatusBar hidden />

        <View style={styles.InputHeaderContainer}>
          <InputHeader searchFunction={searchMoviesFunction} />
        </View>

        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.Orange} />
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      bounces={false}
      contentContainerStyle={styles.scrollViewContainer}
      showsVerticalScrollIndicator={false}>
      <StatusBar hidden />

      <View style={styles.InputHeaderContainer}>
        <InputHeader searchFunction={searchMoviesFunction} />
      </View>

      <CategoryHeader title="Em Cartaz" />
      <FlatList
        data={nowPlayingMoviesList}
        keyExtractor={item => item.id}
        horizontal
        bounces={false}
        decelerationRate={0}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{gap: SPACING.space_36}}
        renderItem={({item, index}) => {
          if (!item.title) {
            return (
              <View
                style={{
                  width: (width - (width * 0.7 + SPACING.space_36 * 2)) / 2,
                }}></View>
            );
          }
          return (
            <MovieCard
              shoudlMarginatedAtEnd={true}
              cardFunction={() => {
                navigation.push('MovieDetails', {movieid: item.id});
              }}
              cardWidth={width * 0.7}
              isFirst={index === 0}
              isLast={index === upComingMoviesList?.length - 1 ? true : false}
              title={item.title}
              imagePath={baseImagePath('w780', item.poster_path)}
              genre={item.genre_ids.slice(0, 3)}
              vote_average={item.vote_average}
              vote_count={item.vote_count}
            />
          );
        }}
      />
      <CategoryHeader title="Populares" />
      <FlatList
        data={popularMoviesList}
        keyExtractor={item => item.id}
        horizontal
        bounces={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{gap: SPACING.space_36}}
        renderItem={({item, index}) => (
          <SubMovieCard
            shoudlMarginatedAtEnd={true}
            cardFunction={() => {
              navigation.push('MovieDetails', {movieid: item.id});
            }}
            cardWidth={width / 3}
            isFirst={index === 0}
            isLast={index === upComingMoviesList?.length - 1}
            title={item.title}
            imagePath={baseImagePath('w342', item.poster_path)}
          />
        )}
      />
      <CategoryHeader title="Próximos Filmes" />
      <FlatList
        data={upComingMoviesList}
        keyExtractor={item => item.id}
        horizontal
        bounces={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{gap: SPACING.space_36}}
        renderItem={({item, index}) => (
          <SubMovieCard
            shoudlMarginatedAtEnd={true}
            cardFunction={() => {
              navigation.push('MovieDetails', {movieid: item.id});
            }}
            cardWidth={width / 3}
            isFirst={index === 0}
            isLast={index === upComingMoviesList?.length - 1}
            title={item.title}
            imagePath={baseImagePath('w342', item.poster_path)}
          />
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Black,
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  loadingContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  InputHeaderContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_28,
  },
});

export default HomeScreen;
