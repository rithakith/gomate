import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { COLORS, SIZES } from '../constants/theme';

/**
 * Reusable Loading Component
 * Displays loading indicator with optional message
 */
const LoadingScreen = ({ message }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={COLORS.primary} />
      {message && <Text style={styles.text}>{message}</Text>}
    </View>
  );
};

LoadingScreen.propTypes = {
  message: PropTypes.string,
};

LoadingScreen.defaultProps = {
  message: 'Loading...',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background.secondary,
  },
  text: {
    marginTop: SIZES.spacing.md,
    fontSize: SIZES.fontSize.lg,
    color: COLORS.text.secondary,
  },
});

export default LoadingScreen;
