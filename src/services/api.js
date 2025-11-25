// API Configuration and Services
import { API_CONFIG } from '../config/config';

const API_BASE_URL = 'https://transportapi.com/v3/uk';

// Fetch real journey data from Transport API
export const fetchPublicJourneys = async (from, to, date, time) => {
  try {
    const params = new URLSearchParams({
      app_id: API_CONFIG.TRANSPORT_APP_ID,
      app_key: API_CONFIG.TRANSPORT_API_KEY,
      from: from,
      to: to,
      date: date || new Date().toISOString().split('T')[0],
      time: time || new Date().toTimeString().split(' ')[0].substring(0, 5),
    });

    const response = await fetch(
      `${API_BASE_URL}/public/journey/from/${from}/to/${to}.json?${params}`,
    );

    if (!response.ok) {
      throw new Error('Failed to fetch journeys');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Get popular UK train journeys with real API
export const getPopularJourneys = async () => {
  try {
    console.log('Fetching journeys from API...');

    // Add timeout to prevent hanging
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('API request timeout')), 5000),
    );

    const apiPromise = fetchPublicJourneys(
      'London',
      'Manchester',
      new Date().toISOString().split('T')[0],
      '09:00',
    );

    const data = await Promise.race([apiPromise, timeoutPromise]);
    console.log('API response received');

    return formatJourneysFromAPI(data);
  } catch (error) {
    console.log('Using mock data due to error:', error.message);
    // Fallback to mock data if API fails
    return getMockJourneys();
  }
};

// Format API response to match our app structure
const formatJourneysFromAPI = apiData => {
  if (!apiData || !apiData.routes) {
    return { journeys: [] };
  }

  const journeys = apiData.routes.map((route, index) => {
    const firstLeg = route.route_parts[0];
    const lastLeg = route.route_parts[route.route_parts.length - 1];

    return {
      id: `${index + 1}`,
      from: firstLeg.from_point_name,
      to: lastLeg.to_point_name,
      departure_time: firstLeg.departure_time,
      arrival_time: lastLeg.arrival_time,
      duration: route.duration,
      operator: firstLeg.operator || 'N/A',
      status: 'On Time',
      price: `£${(Math.random() * 50 + 20).toFixed(2)}`, // Price not in free API
      type: firstLeg.mode || 'Train',
    };
  });

  return { journeys };
};

// Mock data fallback
export const getMockJourneys = () => {
  return Promise.resolve({
    journeys: [
      {
        id: '1',
        from: 'London Euston',
        to: 'Manchester Piccadilly',
        departure_time: '09:30',
        arrival_time: '11:45',
        duration: '2h 15m',
        operator: 'Avanti West Coast',
        status: 'On Time',
        price: '£45.00',
        type: 'Train',
      },
      {
        id: '2',
        from: 'Birmingham New Street',
        to: 'London Paddington',
        departure_time: '10:15',
        arrival_time: '12:30',
        duration: '2h 15m',
        operator: 'GWR',
        status: 'Delayed 5 min',
        price: '£38.50',
        type: 'Train',
      },
      {
        id: '3',
        from: 'Edinburgh Waverley',
        to: 'Glasgow Central',
        departure_time: '08:00',
        arrival_time: '09:00',
        duration: '1h 00m',
        operator: 'ScotRail',
        status: 'On Time',
        price: '£15.00',
        type: 'Train',
      },
      {
        id: '4',
        from: 'Leeds',
        to: 'York',
        departure_time: '11:20',
        arrival_time: '11:50',
        duration: '30m',
        operator: 'Northern',
        status: 'On Time',
        price: '£12.00',
        type: 'Train',
      },
      {
        id: '5',
        from: 'Bristol Temple Meads',
        to: 'Cardiff Central',
        departure_time: '14:00',
        arrival_time: '14:50',
        duration: '50m',
        operator: 'GWR',
        status: 'Cancelled',
        price: '£18.00',
        type: 'Train',
      },
      {
        id: '6',
        from: 'Liverpool Lime Street',
        to: 'London Euston',
        departure_time: '13:30',
        arrival_time: '15:45',
        duration: '2h 15m',
        operator: 'Avanti West Coast',
        status: 'On Time',
        price: '£52.00',
        type: 'Train',
      },
    ],
  });
};
