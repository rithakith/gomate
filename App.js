// App.js
import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import { store } from './src/store/store';

import { AuthProvider, AuthContext } from './context/AuthContext';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import JourneyDetailsScreen from './src/screens/JourneyDetailsScreen';
import FavouritesScreen from './src/screens/FavouritesScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tab Navigator for authenticated users
function MainTabs() {
  const { user } = useContext(AuthContext);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#e0e0e0',
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        headerStyle: {
          backgroundColor: '#fff',
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: '#e0e0e0',
        },
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: 'bold',
          color: '#333',
        },
        headerRight: () => (
          <View style={styles.headerRight}>
            <Text style={styles.headerUsername}>
              👤 {user?.username || 'Guest'}
            </Text>
          </View>
        ),
      }}
    >
      <Tab.Screen
        name="Journeys"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Text style={{ fontSize: 24 }}>{focused ? '🚂' : '🚃'}</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Favourites"
        component={FavouritesScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Text style={{ fontSize: 24 }}>{focused ? '★' : '☆'}</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Text style={{ fontSize: 24 }}>{focused ? '👤' : '👥'}</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Main Navigation
const AppNav = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Screen name="MainTabs" component={MainTabs} />
            <Stack.Screen
              name="JourneyDetails"
              component={JourneyDetailsScreen}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <AppNav />
      </AuthProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  headerRight: {
    marginRight: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
  },
  headerUsername: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
});
