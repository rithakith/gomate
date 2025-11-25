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
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.favouriteButton}
            onPress={handleToggleFavourite}
          >
            <Text style={styles.favouriteIcon}>{isFavourite ? '★' : '☆'}</Text>
          </TouchableOpacity>
        </View>

        {/* Journey Title */}
        <View style={styles.titleSection}>
          <Text style={styles.route}>
            {journey.from} → {journey.to}
          </Text>
          <Text style={styles.subtitle}>Status: {journey.status}</Text>
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
            <Text style={styles.infoValue}>{journey.price}</Text>
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
                This service is currently experiencing delays. Please check for
                updates before traveling.
              </Text>
            </View>
          )}
          {journey.status === 'Cancelled' && (
            <View style={styles.warningBox}>
              <Text style={styles.warningText}>
                This service has been cancelled. Please find alternative
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
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: '#000',
  },
  favouriteButton: {
    padding: 8,
  },
  favouriteIcon: {
    fontSize: 24,
    color: '#000',
  },
  titleSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  route: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  card: {
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
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
    color: '#666',
    marginBottom: 4,
  },
  timeValue: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
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
    color: '#666',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
  },
  infoValue: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  warningBox: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 4,
    marginTop: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#000',
  },
  warningText: {
    fontSize: 14,
    color: '#000',
  },
  bookButton: {
    backgroundColor: '#000',
    marginHorizontal: 16,
    marginVertical: 24,
    padding: 14,
    borderRadius: 4,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});
