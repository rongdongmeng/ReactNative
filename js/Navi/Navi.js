import React, {Component} from 'react';
import {
  View,
  Text,
  Navigator,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native'

import Entrance from '../Entrance/Entrance'
import Platform from 'Platform';

export default class App extends Component {

  render() {
    return (
      <Navigator
        initialRoute={{name: 'Entrance', component: Entrance}}
        configureScene={() => {
          if (Platform.OS === 'android') {
            return Navigator.SceneConfigs.FadeAndroid;
          }
          return Navigator.SceneConfigs.PushFromRight;
        }}
        renderScene={(route, navigator) => {
          if (route.component) {
            const Comp = route.component;
            return <Comp {...route.params} navigator={navigator} />
          }
          return null;
        }}
        navigationBar={this._renderNavBar()}
      />
    );
  }
  _renderNavBar() {
    const routeMapper = {
      LeftButton(route, navigator, index) {
        if (index > 0) {
          return (
          <TouchableOpacity
            onPress={() => navigator.pop()}
            style={styles.button}
          >
            <Image source={require('./img/back.png')} />
          </TouchableOpacity>
        );
        }
        return null
      },
      RightButton(route, navigator, index) {
        if (index > 0 && route.rightButton) {
          return (
            <TouchableOpacity
              onPress={() => navigator.pop()}
              style={styles.button}
            >
              <Text style={styles.buttonText}> 测试</Text>
            </TouchableOpacity>
          );
        }
        return null
      },
      Title(route) {
        return (
          <View style={styles.title}>
            <Text style={styles.buttonText}>{route.title ? route.title : '病例库'}</Text>
          </View>
        );
      },
    };

    return (
      <Navigator.NavigationBar  style={styles.navBar}  routeMapper={routeMapper}/>
    );
  }
}
const styles = StyleSheet.create({
  title: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    flex: 1, width: 50, alignItems: 'center', justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: '#444444',
    fontWeight: '400',
  },
  navBar: {
    alignItems: 'center',
    backgroundColor: 'white',
    shadowOffset: {
      width: 1,
      height: 0.5,
    },
    shadowColor: '#000000',
    shadowOpacity: 0.2,
  },
});
