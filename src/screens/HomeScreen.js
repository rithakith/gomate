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
import { setJourneys, setLoading, loadFavourites, toggleFavourite } from '../store/journeysSlice';

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
      <View style={styles.cardHeader}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>🚂</Text>
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.operator}>{item.operator}</Text>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(item.status) + '20' },
            ]}
          >
            <Text
              style={[
                styles.statusIcon,
                { color: getStatusColor(item.status) },
              ]}
            >
              {getStatusIcon(item.status)}
            </Text>
            <Text
              style={[styles.status, { color: getStatusColor(item.status) }]}
            >
              {item.status}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.favouriteButton}
          onPress={(e) => handleToggleFavourite(item.id, e)}
        >
          <Text style={styles.favouriteIcon}>
            {favourites.includes(item.id) ? '★' : '☆'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.routeContainer}>
        <View style={styles.routePoint}>
          <View style={styles.dotStart} />
          <View style={styles.routeInfo}>
            <Text style={styles.location}>{item.from}</Text>
            <Text style={styles.time}>{item.departure_time}</Text>
          </View>
        </View>

        <View style={styles.routeLine} />

        <View style={styles.routePoint}>
          <View style={styles.dotEnd} />
          <View style={styles.routeInfo}>
            <Text style={styles.location}>{item.to}</Text>
            <Text style={styles.time}>{item.arrival_time}</Text>
          </View>
        </View>
      </View>

      <View style={styles.cardFooter}>
        <View style={styles.footerItem}>
          <Text style={styles.footerLabel}>Duration</Text>
          <Text style={styles.footerValue}>{item.duration}</Text>
        </View>
        <View style={styles.footerDivider} />
        <View style={styles.footerItem}>
          <Text style={styles.footerLabel}>Price</Text>
          <Text style={styles.footerPrice}>{item.price}</Text>
        </View>
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
        <View>
          <Text style={styles.greeting}>
            Hello, {user?.username || 'Guest'}! 👋
          </Text>
          <Text style={styles.subtitle}>Find your next journey</Text>
        </View>
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
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  listContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  icon: {
    fontSize: 24,
  },
  headerInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  favouriteButton: {
    padding: 4,
    marginLeft: 8,
  },
  favouriteIcon: {
    fontSize: 24,
    color: '#FFD700',
  },
  operator: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusIcon: {
    fontSize: 10,
    marginRight: 4,
    fontWeight: 'bold',
  },
  status: {
    fontSize: 12,
    fontWeight: '600',
  },
  routeContainer: {
    marginBottom: 16,
  },
  routePoint: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dotStart: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#007AFF',
    marginRight: 12,
  },
  dotEnd: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#34C759',
    marginRight: 12,
  },
  routeLine: {
    width: 2,
    height: 24,
    backgroundColor: '#e0e0e0',
    marginLeft: 5,
    marginVertical: 4,
  },
  routeInfo: {
    flex: 1,
  },
  location: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  time: {
    fontSize: 14,
    color: '#666',
  },
  cardFooter: {
    flexDirection: 'row',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  footerItem: {
    flex: 1,
    alignItems: 'center',
  },
  footerDivider: {
    width: 1,
    backgroundColor: '#e0e0e0',
  },
  footerLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  footerValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  footerPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
});
