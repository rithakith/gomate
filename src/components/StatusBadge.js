import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { getStatusColor, getStatusIcon } from '../utils/helpers';
import { COLORS, SIZES } from '../constants/theme';

/**
 * Reusable Status Badge Component
 * Displays journey status with color-coded styling
 */
const StatusBadge = ({ status, size }) => {
  const statusColor = getStatusColor(status);
  const statusIconChar = getStatusIcon(status);

  const badgeSize = size === 'small' ? styles.badgeSmall : styles.badge;
  const textSize = size === 'small' ? styles.textSmall : styles.text;

  return (
    <View style={[badgeSize, { backgroundColor: statusColor + '20' }]}>
      <Text style={[styles.icon, { color: statusColor }]}>
        {statusIconChar}
      </Text>
      <Text style={[textSize, { color: statusColor }]}>{status}</Text>
    </View>
  );
};

StatusBadge.propTypes = {
  status: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['small', 'medium']),
};

StatusBadge.defaultProps = {
  size: 'medium',
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.spacing.md,
    paddingVertical: SIZES.spacing.sm,
    borderRadius: SIZES.borderRadius.xl,
  },
  badgeSmall: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.spacing.sm,
    paddingVertical: SIZES.spacing.xs,
    borderRadius: SIZES.borderRadius.md,
  },
  icon: {
    fontSize: 10,
    marginRight: SIZES.spacing.xs,
    fontWeight: 'bold',
  },
  text: {
    fontSize: SIZES.fontSize.md,
    fontWeight: '600',
  },
  textSmall: {
    fontSize: SIZES.fontSize.sm,
    fontWeight: '600',
  },
});

export default StatusBadge;
