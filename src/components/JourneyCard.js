import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { getStatusColor, getStatusIcon } from '../utils/helpers';
import { COLORS, SIZES, SHADOW } from '../constants/theme';

/**
 * Reusable Journey Card Component
 * Displays journey information in a card format
 */
const JourneyCard = ({ journey, onPress, onToggleFavourite, isFavourite }) => {
  const handleFavouritePress = e => {
    e.stopPropagation();
    onToggleFavourite && onToggleFavourite(journey.id);
  };

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.7}
      onPress={() => onPress && onPress(journey)}
    >
      <View style={styles.cardHeader}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>🚂</Text>
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.operator}>{journey.operator}</Text>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(journey.status) + '20' },
            ]}
          >
            <Text
              style={[
                styles.statusIcon,
                { color: getStatusColor(journey.status) },
              ]}
            >
              {getStatusIcon(journey.status)}
            </Text>
            <Text
              style={[styles.status, { color: getStatusColor(journey.status) }]}
            >
              {journey.status}
            </Text>
          </View>
        </View>
        {onToggleFavourite && (
          <TouchableOpacity
            style={styles.favouriteButton}
            onPress={handleFavouritePress}
          >
            <Text style={styles.favouriteIcon}>{isFavourite ? '★' : '☆'}</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.routeContainer}>
        <View style={styles.routePoint}>
          <View style={styles.dotStart} />
          <View style={styles.routeInfo}>
            <Text style={styles.location}>{journey.from}</Text>
            <Text style={styles.time}>{journey.departure_time}</Text>
          </View>
        </View>

        <View style={styles.routeLine} />

        <View style={styles.routePoint}>
          <View style={styles.dotEnd} />
          <View style={styles.routeInfo}>
            <Text style={styles.location}>{journey.to}</Text>
            <Text style={styles.time}>{journey.arrival_time}</Text>
          </View>
        </View>
      </View>

      <View style={styles.cardFooter}>
        <View style={styles.footerItem}>
          <Text style={styles.footerLabel}>Duration</Text>
          <Text style={styles.footerValue}>{journey.duration}</Text>
        </View>
        <View style={styles.footerDivider} />
        <View style={styles.footerItem}>
          <Text style={styles.footerLabel}>Price</Text>
          <Text style={styles.footerPrice}>{journey.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

JourneyCard.propTypes = {
  journey: PropTypes.shape({
    id: PropTypes.string.isRequired,
    from: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    departure_time: PropTypes.string.isRequired,
    arrival_time: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    operator: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    type: PropTypes.string,
  }).isRequired,
  onPress: PropTypes.func,
  onToggleFavourite: PropTypes.func,
  isFavourite: PropTypes.bool,
};

JourneyCard.defaultProps = {
  onPress: null,
  onToggleFavourite: null,
  isFavourite: false,
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.background.primary,
    borderRadius: SIZES.borderRadius.lg,
    padding: SIZES.spacing.lg,
    marginBottom: SIZES.spacing.lg,
    ...SHADOW.medium,
  },
  cardHeader: {
    flexDirection: 'row',
    marginBottom: SIZES.spacing.lg,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.background.tertiary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.spacing.md,
  },
  icon: {
    fontSize: SIZES.icon.lg,
  },
  headerInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  favouriteButton: {
    padding: SIZES.spacing.xs,
    marginLeft: SIZES.spacing.sm,
  },
  favouriteIcon: {
    fontSize: SIZES.icon.lg,
    color: COLORS.accent,
  },
  operator: {
    fontSize: SIZES.fontSize.lg,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: SIZES.spacing.xs,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: SIZES.spacing.sm,
    paddingVertical: SIZES.spacing.xs,
    borderRadius: SIZES.borderRadius.md,
  },
  statusIcon: {
    fontSize: 10,
    marginRight: SIZES.spacing.xs,
    fontWeight: 'bold',
  },
  status: {
    fontSize: SIZES.fontSize.sm,
    fontWeight: '600',
  },
  routeContainer: {
    marginBottom: SIZES.spacing.lg,
  },
  routePoint: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dotStart: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.primary,
    marginRight: SIZES.spacing.md,
  },
  dotEnd: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.secondary,
    marginRight: SIZES.spacing.md,
  },
  routeLine: {
    width: 2,
    height: 24,
    backgroundColor: COLORS.border.light,
    marginLeft: 5,
    marginVertical: SIZES.spacing.xs,
  },
  routeInfo: {
    flex: 1,
  },
  location: {
    fontSize: SIZES.fontSize.lg,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 2,
  },
  time: {
    fontSize: SIZES.fontSize.md,
    color: COLORS.text.secondary,
  },
  cardFooter: {
    flexDirection: 'row',
    paddingTop: SIZES.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.background.tertiary,
  },
  footerItem: {
    flex: 1,
    alignItems: 'center',
  },
  footerDivider: {
    width: 1,
    backgroundColor: COLORS.border.light,
  },
  footerLabel: {
    fontSize: SIZES.fontSize.sm,
    color: COLORS.text.tertiary,
    marginBottom: SIZES.spacing.xs,
  },
  footerValue: {
    fontSize: SIZES.fontSize.lg,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  footerPrice: {
    fontSize: SIZES.fontSize.xl,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
});

export default JourneyCard;
