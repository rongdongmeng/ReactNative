import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import Dimensions from 'Dimensions'
import PictureBrowser from '../PictureBrowser/PictureBrowser'

let sessionKey = '7B32303230463942313032433431443631323743363245453837374334373335427D2C7B393365643833383631343937373536313131346137633766613363636233626161623264646230657D2C7B747275657D2C7B3230307D2C7B3831373834387D2C7B62326466313064382D396365612D343665662D393235312D3063363431623365633162327D2C7B36343339316633393466386662313935663065656331343466633831306438327D2C7B323031362D30362D32362031343A33323A35337D2C7B342E32352E307D2C7B696F736D65646963616C7265636F726473666F6C6465727D2C7B494F534D65646963616C5265636F726473466F6C6465725F342E32352E305F696F73392E3230303030305F6950686F6E65372D327D';
var MR_RECORD_REQUSET_URL = 'http://services.xingshulin.com/doctor-pocket/medicalCase/getMedicalCaseDetail/';

export default class MRLibraryRecord extends Component {

  props: {
    navigator: Navigator,
    rowData: any,
    recordData: any,
    authors: any,
    loaded: false,
  }

  componentWillMount() {
    this.state = {
      rowData: this.props.rowData,
      authors: [],
    }
    //alert(MR_RECORD_REQUSET_URL+this.props.rowData.id);
    let url = MR_RECORD_REQUSET_URL + this.props.rowData.id;
    this.getData(url);
    //alert(this.state.authors);
  }

  getData(reqUrl){
    var reqHeaders = new Headers({'sessionKey':sessionKey,});

    var reqInit = {
                    method: 'GET',
                    headers: reqHeaders,
                 };

    fetch(reqUrl, reqInit)
    .then((response) => response.json())
    .then((responseData) => {
      //alert(responseData.obj.medicalCaseAuthors);
    //alert(responseData.obj.medicalCaseVo.abstractAbbr);
        this.setState({
          recordData : responseData.obj.medicalCaseVo.abstractAbbr,
          authors: responseData.obj.medicalCaseAuthors,
          //this.state.dataSource.cloneWithRows(),
          loaded:true,
        });
    })
    .done();
  }

  _onItemPressed(rowData) {
    this.props.navigator.push({
      name: 'PictureBrowser',
      component: PictureBrowser,
      params: {
        image: rowData.picUrl,
      },
    });
  }


  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.rowView}>
          <View style={styles.topView}>
            <View style={styles.topLeftView}>
                <Text style={styles.nameText}>{this.state.rowData.medicalName}</Text>
            </View>
           </View>
        <View style={{flex: 1, backgroundColor: '#dddddd', height: 0.5, marginLeft: 10, marginRight: 10}} />
        <View style={{marginTop: 10, marginLeft: 10}}>
          {this.state.authors.map((author) => <Text style={styles.contentTitle}>{author.authorUnit+' '+author.author}</Text>)}
          <TouchableHighlight onPress={() => this._onItemPressed(this.state.rowData)} underlayColor = "#cde7ff">
          <Image resizeMode={Image.resizeMode.cover} source={{uri:this.state.rowData.picUrl}} style = {styles.image} />
          </TouchableHighlight>
          <Text style={styles.content}>{this.state.recordData}</Text>
        </View>
       </View>
     </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 64,
  },
  rowView: {
    backgroundColor: 'white',
  },
  topView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    marginLeft: 10,
  },
  topLeftView: {
    flex: 1,
    height: 60,
    marginLeft: 10,
  },
  nameText: {
    fontSize: 18,
    color: '#6b7bab',
    marginTop: 10,
  },
  subTitleText: {
    fontSize: 12,
    color: '#999999',
  },
  timeText: {
    fontSize: 12,
    color: '#999999',
    marginRight: 10,
  },
  contentTitle: {
    fontSize: 14,
    color: '#A0A0A0',
  },
  content: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 50,
  },
  image: {
    width: Dimensions.get('window').width - 20,
    height: Dimensions.get('window').width - 20,
    marginTop: 5,
  },
});
