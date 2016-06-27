import React, {Component} from 'react';
import {Image, View, Text, TouchableHighlight, StyleSheet} from 'react-native';

import MRLibraryList from '../MRLibraryList/MRLibraryList';


const dataItem = {
    icon: require('./img/recordlibrary.png'),
    component: MRLibraryList,
    componentName: 'MRLibraryList',
  };

export default class Entrance extends Component {

  render() {
    return (
      <View style={[styles.container]}>
      <TouchableHighlight style={styles.touchable} underlayColor="#cde7ff" onPress={() => this._onItemPressed(dataItem.componentName, dataItem.component, dataItem.title)}>
        <View style={styles.itemContainer}>
          <Image resizeMode={Image.resizeMode.cover} style={styles.image} source={dataItem.icon} />
        </View>
      </TouchableHighlight>
      </View>
    );
  }

  _onItemPressed(name, component, title) {
    this.props.navigator.push({
      name: name,
      title: title,
      component: component,
    });
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 64,
    alignItems: 'center',
    backgroundColor: '#C8C7CC',
  },
  touchable: {
    marginTop: 10,
    marginBottom: 10,
    //borderWidth: 2,
  },
  itemContainer: {
    flexDirection: 'row',
    //flex:1,
    //height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    flex: 1,
    //height: 40,
    //borderWidth: 1,
    //marginLeft: 10,
  },
});
