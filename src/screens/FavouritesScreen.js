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

  const getStatusColor = status => {
    if (status === 'On Time') return '#34C759';
    if (status.includes('Delayed')) return '#FF9500';
    if (status === 'Cancelled') return '#FF3B30';
    return '#999';
  };

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
        <View style={styles.timeBlock}>
          <Text style={styles.timeLabel}>Departs</Text>
          <Text style={styles.timeValue}>{item.departure_time}</Text>
        </View>
        <View style={styles.durationBlock}>
          <Text style={styles.durationText}>{item.duration}</Text>
        </View>
        <View style={styles.timeBlock}>
          <Text style={styles.timeLabel}>Arrives</Text>
          <Text style={styles.timeValue}>{item.arrival_time}</Text>
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.operatorContainer}>
          <Text style={styles.operatorLabel}>Operator: </Text>
          <Text style={styles.operatorValue}>{item.operator}</Text>
        </View>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(item.status) },
          ]}
        >
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.typeText}>🚂 {item.type}</Text>
        <Text style={styles.priceText}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>☆</Text>
      <Text style={styles.emptyTitle}>No Favourites Yet</Text>
      <Text style={styles.emptyText}>
        Tap the star icon on any journey to add it to your favourites.
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Favourites</Text>
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
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
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
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  routeContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  fromText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  arrowText: {
    fontSize: 16,
    color: '#007AFF',
    marginHorizontal: 8,
  },
  toText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  favouriteButton: {
    padding: 4,
  },
  favouriteIcon: {
    fontSize: 24,
    color: '#FFD700',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  timeBlock: {
    flex: 1,
  },
  timeLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  timeValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  durationBlock: {
    paddingHorizontal: 12,
  },
  durationText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  operatorContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  operatorLabel: {
    fontSize: 14,
    color: '#666',
  },
  operatorValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  typeText: {
    fontSize: 14,
    color: '#666',
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#34C759',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyIcon: {
    fontSize: 80,
    marginBottom: 20,
    opacity: 0.3,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
});
