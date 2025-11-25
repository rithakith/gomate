import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavourite } from '../store/journeysSlice';

export default function FavouritesScreen({ navigation }) {
  const dispatch = useDispatch();
  const journeys = useSelector(state => state.journeys.journeys);
  const favourites = useSelector(state => state.journeys.favourites);

  const favouriteJourneys = journeys.filter(journey =>
    favourites.includes(journey.id),
  );

  const handleRemoveFavourite = journeyId => {
    dispatch(toggleFavourite(journeyId));
  };

  const handleJourneyPress = journey => {
    navigation.navigate('JourneyDetails', { journey });
  };

  const renderJourney = ({ item }) => (
    <TouchableOpacity
      style={styles.journeyCard}
      onPress={() => handleJourneyPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.cardHeader}>
        <View style={styles.routeContainer}>
          <Text style={styles.fromText}>{item.from}</Text>
          <Text style={styles.arrowText}>→</Text>
          <Text style={styles.toText}>{item.to}</Text>
        </View>
        <TouchableOpacity
          style={styles.favouriteButton}
          onPress={() => handleRemoveFavourite(item.id)}
        >
          <Text style={styles.favouriteIcon}>★</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>
          {item.departure_time} - {item.arrival_time}
        </Text>
        <Text style={styles.durationText}>{item.duration}</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.operatorText}>{item.operator}</Text>
        <Text style={styles.priceText}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>No Favourites Yet</Text>
      <Text style={styles.emptyText}>
        Tap the star icon on any journey to add it to your favourites.
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favourites</Text>
        <Text style={styles.headerSubtitle}>
          {favouriteJourneys.length}{' '}
          {favouriteJourneys.length === 1 ? 'journey' : 'journeys'}
        </Text>
      </View>
      <FlatList
        data={favouriteJourneys}
        renderItem={renderJourney}
        keyExtractor={item => item.id}
        contentContainerStyle={
          favouriteJourneys.length === 0
            ? styles.emptyListContainer
            : styles.listContainer
        }
        ListEmptyComponent={renderEmptyState}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  listContainer: {
    padding: 16,
  },
  emptyListContainer: {
    flexGrow: 1,
  },
  journeyCard: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  routeContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  fromText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  arrowText: {
    fontSize: 16,
    color: '#000',
    marginHorizontal: 8,
  },
  toText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  favouriteButton: {
    padding: 4,
  },
  favouriteIcon: {
    fontSize: 20,
    color: '#000',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  timeText: {
    fontSize: 14,
    color: '#666',
  },
  durationText: {
    fontSize: 14,
    color: '#666',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  operatorText: {
    fontSize: 14,
    color: '#000',
  },
  priceText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
});
