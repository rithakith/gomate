// Validation utilities for forms and inputs

/**
 * Email validation using regex
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Password strength validation
 * @param {string} password - Password to validate
 * @returns {object} - {isValid: boolean, message: string}
 */
export const validatePassword = (password) => {
  if (!password) {
    return { isValid: false, message: 'Password is required' };
  }
  
  if (password.length < 6) {
    return { isValid: false, message: 'Password must be at least 6 characters' };
  }
  
  if (password.length > 50) {
    return { isValid: false, message: 'Password must be less than 50 characters' };
  }
  
  return { isValid: true, message: '' };
};

/**
 * Username validation
 * @param {string} username - Username to validate
 * @returns {object} - {isValid: boolean, message: string}
 */
export const validateUsername = (username) => {
  if (!username) {
    return { isValid: false, message: 'Username is required' };
  }
  
  if (username.trim().length < 3) {
    return { isValid: false, message: 'Username must be at least 3 characters' };
  }
  
  if (username.trim().length > 20) {
    return { isValid: false, message: 'Username must be less than 20 characters' };
  }
  
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return { isValid: false, message: 'Username can only contain letters, numbers, and underscores' };
  }
  
  return { isValid: true, message: '' };
};

/**
 * Required field validation
 * @param {string} value - Value to validate
 * @param {string} fieldName - Name of the field for error message
 * @returns {object} - {isValid: boolean, message: string}
 */
export const validateRequired = (value, fieldName = 'This field') => {
  if (!value || value.trim() === '') {
    return { isValid: false, message: `${fieldName} is required` };
  }
  
  return { isValid: true, message: '' };
};

/**
 * Validate login form
 * @param {string} username - Username
 * @param {string} password - Password
 * @returns {object} - {isValid: boolean, errors: object}
 */
export const validateLoginForm = (username, password) => {
  const errors = {};
  
  const usernameValidation = validateRequired(username, 'Username');
  if (!usernameValidation.isValid) {
    errors.username = usernameValidation.message;
  }
  
  const passwordValidation = validateRequired(password, 'Password');
  if (!passwordValidation.isValid) {
    errors.password = passwordValidation.message;
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validate registration form
 * @param {string} username - Username
 * @param {string} email - Email
 * @param {string} password - Password
 * @param {string} confirmPassword - Confirm password
 * @returns {object} - {isValid: boolean, errors: object}
 */
export const validateRegisterForm = (username, email, password, confirmPassword) => {
  const errors = {};
  
  // Username validation
  const usernameValidation = validateUsername(username);
  if (!usernameValidation.isValid) {
    errors.username = usernameValidation.message;
  }
  
  // Email validation
  if (!email || email.trim() === '') {
    errors.email = 'Email is required';
  } else if (!validateEmail(email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  // Password validation
  const passwordValidation = validatePassword(password);
  if (!passwordValidation.isValid) {
    errors.password = passwordValidation.message;
  }
  
  // Confirm password validation
  if (!confirmPassword) {
    errors.confirmPassword = 'Please confirm your password';
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
