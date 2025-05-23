import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import FleetScreen from './src/screens/FleetScreen';
import MotoDetailsScreen from './src/screens/MotoDetailsScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLogged, setIsLogged] = useState(null);

  useEffect(() => {
    const checkLogin = async () => {
      const user = await AsyncStorage.getItem('usuario');
      setIsLogged(user ? true : false);
    };
    checkLogin();
  }, []);

  if (isLogged === null) {
    return null; // Pode colocar uma splash screen aqui
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#121212' }, headerTintColor: '#00ff99', headerTitleAlign: 'center' }}>
        {isLogged ? (
          <>
            <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Fleet" component={FleetScreen} options={{ title: 'Pátio' }} />
            <Stack.Screen name="MotoDetails" component={MotoDetailsScreen} options={{ title: 'Detalhes da Moto' }} />
            <Stack.Screen name="Profile" options={{ title: 'Perfil' }}>
              {props => <ProfileScreen {...props} setIsLogged={setIsLogged} />}
            </Stack.Screen>
          </>
        ) : (
          <>
            <Stack.Screen name="SignIn" options={{ headerShown: false }}>
              {props => <SignInScreen {...props} setIsLogged={setIsLogged} />}
            </Stack.Screen>
            <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
