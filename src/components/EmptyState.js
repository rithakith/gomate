import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { COLORS, SIZES } from '../constants/theme';

/**
 * Reusable Empty State Component
 * Displays when no data is available
 */
const EmptyState = ({ icon, title, message }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.title}>{title}</Text>
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
};

EmptyState.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  message: PropTypes.string,
};

EmptyState.defaultProps = {
  icon: '📭',
  message: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.spacing.xxl * 2,
  },
  icon: {
    fontSize: 80,
    marginBottom: SIZES.spacing.xl,
    opacity: 0.3,
  },
  title: {
    fontSize: SIZES.fontSize.xxxl,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: SIZES.spacing.md,
    textAlign: 'center',
  },
  message: {
    fontSize: SIZES.fontSize.lg,
    color: COLORS.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default EmptyState;
