import { createAppContainer, createStackNavigator } from 'react-navigation';
import LoginScreen from './src/screens/Login';
import DevsScreen from './src/screens/Devs';
import ProfileScreen from './src/screens/Profile';


const AppNavigator = createStackNavigator({
  Login: LoginScreen,
  Devs: DevsScreen,
  Profile: ProfileScreen
});

export default createAppContainer(AppNavigator);
