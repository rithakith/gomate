import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavourite } from '../store/journeysSlice';

export default function JourneyDetailsScreen({ route, navigation }) {
  const { journey } = route.params;
  const dispatch = useDispatch();
  const favourites = useSelector(state => state.journeys.favourites);
  const isFavourite = favourites.includes(journey.id);

  const getStatusColor = status => {
    if (status === 'On Time') return '#34C759';
    if (status.includes('Delayed')) return '#FF9500';
    if (status === 'Cancelled') return '#FF3B30';
    return '#999';
  };

  const handleToggleFavourite = () => {
    dispatch(toggleFavourite(journey.id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.favouriteButton}
            onPress={handleToggleFavourite}
          >
            <Text style={styles.favouriteIcon}>
              {isFavourite ? '★' : '☆'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Journey Title */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>Journey Details</Text>
          <Text style={styles.route}>
            {journey.from} → {journey.to}
          </Text>
        </View>

        {/* Status Card */}
        <View style={styles.card}>
          <View style={styles.statusContainer}>
            <Text style={styles.cardLabel}>Status</Text>
            <View
              style={[
                styles.statusBadge,
                { backgroundColor: getStatusColor(journey.status) },
              ]}
            >
              <Text style={styles.statusText}>{journey.status}</Text>
            </View>
          </View>
        </View>

        {/* Time Details Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Time Details</Text>
          <View style={styles.timeRow}>
            <View style={styles.timeColumn}>
              <Text style={styles.timeLabel}>Departure</Text>
              <Text style={styles.timeValue}>{journey.departure_time}</Text>
              <Text style={styles.locationText}>{journey.from}</Text>
            </View>
            <View style={styles.durationContainer}>
              <Text style={styles.durationText}>{journey.duration}</Text>
              <Text style={styles.arrow}>→</Text>
            </View>
            <View style={styles.timeColumn}>
              <Text style={styles.timeLabel}>Arrival</Text>
              <Text style={styles.timeValue}>{journey.arrival_time}</Text>
              <Text style={styles.locationText}>{journey.to}</Text>
            </View>
          </View>
        </View>

        {/* Service Information Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Service Information</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Operator</Text>
            <Text style={styles.infoValue}>{journey.operator}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Service Type</Text>
            <Text style={styles.infoValue}>{journey.type}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Price</Text>
            <Text style={[styles.infoValue, styles.priceText]}>
              {journey.price}
            </Text>
          </View>
        </View>

        {/* Additional Info */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Journey Information</Text>
          <Text style={styles.infoText}>
            This is a {journey.type.toLowerCase()} service operated by{' '}
            {journey.operator}. The journey takes approximately{' '}
            {journey.duration} to complete.
          </Text>
          {journey.status.includes('Delayed') && (
            <View style={styles.warningBox}>
              <Text style={styles.warningText}>
                ⚠️ This service is currently experiencing delays. Please check
                for updates before traveling.
              </Text>
            </View>
          )}
          {journey.status === 'Cancelled' && (
            <View style={[styles.warningBox, styles.cancelledBox]}>
              <Text style={[styles.warningText, styles.cancelledText]}>
                ❌ This service has been cancelled. Please find alternative
                transport.
              </Text>
            </View>
          )}
        </View>

        {/* Book Button */}
        <TouchableOpacity style={styles.bookButton}>
          <Text style={styles.bookButtonText}>Book This Journey</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
  favouriteButton: {
    padding: 8,
  },
  favouriteIcon: {
    fontSize: 28,
    color: '#FFD700',
  },
  titleSection: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  route: {
    fontSize: 18,
    color: '#666',
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardLabel: {
    fontSize: 16,
    color: '#666',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeColumn: {
    flex: 1,
    alignItems: 'center',
  },
  timeLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  timeValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  locationText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  durationContainer: {
    alignItems: 'center',
    marginHorizontal: 8,
  },
  durationText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
    marginBottom: 4,
  },
  arrow: {
    fontSize: 20,
    color: '#007AFF',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: 16,
    color: '#666',
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  priceText: {
    color: '#34C759',
    fontSize: 18,
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  warningBox: {
    backgroundColor: '#FFF3CD',
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9500',
  },
  cancelledBox: {
    backgroundColor: '#F8D7DA',
    borderLeftColor: '#FF3B30',
  },
  warningText: {
    fontSize: 14,
    color: '#856404',
  },
  cancelledText: {
    color: '#721C24',
  },
  bookButton: {
    backgroundColor: '#007AFF',
    marginHorizontal: 16,
    marginVertical: 24,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
