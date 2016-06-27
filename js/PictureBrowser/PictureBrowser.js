import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView
} from 'react-native';
import Dimensions from 'Dimensions'

export default class PictureBrowser extends Component {

  props: {
    navigator: Navigator,
    image: any,
  }

  componentWillMount() {
    this.state = {
      image: this.props.image,
    }
  }


  render() {
    return (
        <View style = {styles.containerView}>
          <Image resizeMode={Image.resizeMode.cover} source={{uri:this.state.image}} style = {styles.image} />
        </View>
    );
  }
}
const styles = StyleSheet.create({

  containerView: {
    flex:1,
    marginTop: 64,
    backgroundColor: 'black',
    alignItems:'center',
    justifyContent:'center',
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
  },
});
