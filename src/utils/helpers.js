// Utility functions for formatting and data manipulation

/**
 * Format time to 12-hour format
 * @param {string} time24 - Time in 24-hour format (HH:MM)
 * @returns {string} - Time in 12-hour format (h:MM AM/PM)
 */
export const formatTime12Hour = (time24) => {
  if (!time24) return '';
  
  const [hours, minutes] = time24.split(':');
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  
  return `${hour12}:${minutes} ${ampm}`;
};

/**
 * Get status color based on status text
 * @param {string} status - Journey status
 * @returns {string} - Color code
 */
export const getStatusColor = (status) => {
  if (!status) return '#999';
  
  if (status === 'On Time') return '#34C759';
  if (status.includes('Delayed')) return '#FF9500';
  if (status === 'Cancelled') return '#FF3B30';
  return '#999';
};

/**
 * Get status icon based on status text
 * @param {string} status - Journey status
 * @returns {string} - Status icon
 */
export const getStatusIcon = (status) => {
  if (!status) return '•';
  
  if (status === 'On Time') return '✓';
  if (status.includes('Delayed')) return '⚠';
  if (status === 'Cancelled') return '✕';
  return '•';
};

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} - Truncated text
 */
export const truncateText = (text, maxLength = 50) => {
  if (!text || text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

/**
 * Format price
 * @param {number|string} price - Price value
 * @returns {string} - Formatted price
 */
export const formatPrice = (price) => {
  if (typeof price === 'string' && price.startsWith('£')) {
    return price;
  }
  
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  return `£${numPrice.toFixed(2)}`;
};

/**
 * Capitalize first letter of each word
 * @param {string} text - Text to capitalize
 * @returns {string} - Capitalized text
 */
export const capitalizeWords = (text) => {
  if (!text) return '';
  
  return text
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Safe JSON parse with fallback
 * @param {string} json - JSON string to parse
 * @param {*} fallback - Fallback value if parse fails
 * @returns {*} - Parsed object or fallback
 */
export const safeJsonParse = (json, fallback = null) => {
  try {
    return JSON.parse(json);
  } catch (error) {
    console.error('JSON parse error:', error);
    return fallback;
  }
};

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} - Debounced function
 */
export const debounce = (func, wait = 300) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
