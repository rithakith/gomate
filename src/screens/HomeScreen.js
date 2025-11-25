import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Image,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../context/AuthContext';
import { getMockJourneys } from '../services/api';
import {
  setJourneys,
  setLoading,
  loadFavourites,
  toggleFavourite,
} from '../store/journeysSlice';

export default function HomeScreen({ navigation }) {
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch();
  const journeys = useSelector(state => state.journeys.journeys);
  const loading = useSelector(state => state.journeys.loading);
  const favourites = useSelector(state => state.journeys.favourites);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchJourneys();
    loadFavouritesFromStorage();
  }, []);

  const loadFavouritesFromStorage = async () => {
    try {
      const savedFavourites = await AsyncStorage.getItem('favourites');
      if (savedFavourites) {
        dispatch(loadFavourites(JSON.parse(savedFavourites)));
      }
    } catch (error) {
      console.error('Error loading favourites:', error);
    }
  };

  const fetchJourneys = async () => {
    try {
      dispatch(setLoading(true));
      const data = await getMockJourneys();
      dispatch(setJourneys(data.journeys));
    } catch (error) {
      console.error('Error fetching journeys:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchJourneys();
    setRefreshing(false);
  };

  const getStatusColor = status => {
    if (status === 'On Time') return '#34C759';
    if (status.includes('Delayed')) return '#FF9500';
    if (status === 'Cancelled') return '#FF3B30';
    return '#999';
  };

  const getStatusIcon = status => {
    if (status === 'On Time') return '✓';
    if (status.includes('Delayed')) return '⚠';
    if (status === 'Cancelled') return '✕';
    return '•';
  };

  const handleJourneyPress = journey => {
    navigation.navigate('JourneyDetails', { journey });
  };

  const handleToggleFavourite = (journeyId, event) => {
    event.stopPropagation();
    dispatch(toggleFavourite(journeyId));
  };

  const renderJourneyCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.7}
      onPress={() => handleJourneyPress(item)}
    >
      <View style={styles.row}>
        <View style={styles.routeInfo}>
          <Text style={styles.location}>{item.from}</Text>
          <Text style={styles.arrow}>→</Text>
          <Text style={styles.location}>{item.to}</Text>
        </View>
        <TouchableOpacity
          onPress={e => handleToggleFavourite(item.id, e)}
        >
          <Text style={styles.star}>
            {favourites.includes(item.id) ? '★' : '☆'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.details}>
        <Text style={styles.detailText}>{item.departure_time} - {item.arrival_time}</Text>
        <Text style={styles.detailText}>{item.duration}</Text>
      </View>

      <View style={styles.bottom}>
        <Text style={styles.operator}>{item.operator}</Text>
        <Text style={styles.price}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading journeys...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Journeys</Text>
      </View>

      <FlatList
        data={journeys}
        renderItem={renderJourneyCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#007AFF"
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No journeys available</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 14,
    color: '#666',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  listContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  routeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  location: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  arrow: {
    fontSize: 16,
    color: '#666',
    marginHorizontal: 8,
  },
  star: {
    fontSize: 20,
    color: '#000',
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
  },
  operator: {
    fontSize: 14,
    color: '#666',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
  },
});
