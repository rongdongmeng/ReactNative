//import React from 'react';
import React, { Component } from 'react';
import {
  View,
  Text,
  ListView,
  Image,
  StyleSheet,
  TouchableHighlight,
  } from 'react-native';

import MRLibraryRecord from '../MRLibraryRecord/MRLibraryRecord';


let sessionKey = '7B32303230463942313032433431443631323743363245453837374334373335427D2C7B393365643833383631343937373536313131346137633766613363636233626161623264646230657D2C7B747275657D2C7B3230307D2C7B3831373834387D2C7B62326466313064382D396365612D343665662D393235312D3063363431623365633162327D2C7B36343339316633393466386662313935663065656331343466633831306438327D2C7B323031362D30362D32362031343A33323A35337D2C7B342E32352E307D2C7B696F736D65646963616C7265636F726473666F6C6465727D2C7B494F534D65646963616C5265636F726473466F6C6465725F342E32352E305F696F73392E3230303030305F6950686F6E65372D327D';
var MR_LIST_REQUSET_URL = 'http://services.xingshulin.com/doctor-pocket/medicalCase/getMedicalCaseListByCategoryId';


export default class MRLibraryList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded:false,
    }
  }


  componentDidMount(){
    this.getData();
  }

  getData() {

    var reqHeaders = new Headers();
    reqHeaders.append('sessionKey', sessionKey);
    reqHeaders.append('Content-Type', 'application/json');

    var myInit = {
                    method: 'POST',
                    headers: reqHeaders,
                    body: JSON.stringify({
                      'categoryId':3,
                      'pageIndex':1,
                      'pageSize':20,
                    }),
                 };

    fetch(MR_LIST_REQUSET_URL, myInit)
    .then((response) => response.json())
    .then((responseData) => {
      //alert(responseData.obj.medicalCaseVoList);
        this.setState({
          dataSource:this.state.dataSource.cloneWithRows(responseData.obj.medicalCaseVoList),
          loaded:true,
        });
    })
    .done();
  }

  _onItemPressed(rowData) {
    this.props.navigator.push({
      name: 'MRLibraryRecord',
      title: rowData.title,
      component: MRLibraryRecord,
      params: {
        rowData: rowData,
      },
    });
  }

  renderLoadingView() {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center', flex:1}}>
        <Text>
          正在加载数据......
        </Text>
      </View>
    );
  }

  render() {

    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <View style={{flex: 1, marginTop: 64}}>
        <ListView style={styles.list}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => this.renderItem(rowData)}
        />
      </View>
    );
  }


  renderItem(rowData) {
    return (
      <TouchableHighlight onPress={() => this._onItemPressed(rowData)} underlayColor = "#cde7ff">
        <View style={styles.itemContainer}>
        <View style={styles.container}>
            <View style={{flexDirection:'row',}}>
              <Image
                source={{uri: rowData.picUrl}}
                style={styles.thumbnail}
              />
              <View style={styles.rightContainer}>
                <Text style={styles.title}>{rowData.medicalName}</Text>
                <Text style={styles.year}>{rowData.authorUnit}</Text>
                <Text style={styles.createDate}>{rowData.createDate}</Text>
              </View>
            </View>
             <View style={{flex:1, height:1, backgroundColor:'black',}} />
        </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    borderBottomWidth: 1,
    borderColor: '#fff'
  },
  thumbnail: {
    width: 100,
    height: 80,
    margin: 10,
  },
  rightContainer : {
    flex : 1,
    margin : 10,
  },
  title: {
    fontSize : 16,
    textAlign : 'left',
  },
  year: {
    fontSize: 12,
    marginTop: 10,
    color: '#999999',
    textAlign: 'left',
  },
  createDate: {
    fontSize:10,
    color: '#444444',
    marginTop: 10,
    textAlign: 'right',
  },
  listview: {
    paddingTop:20,
    marginTop:64,
    backgroundColor: '#F5FCFF',
  },
  button: {
    flex: 1,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: '#444444',
    fontWeight: '400',
  },
  list: {
    backgroundColor: '#eeeeee',
    flex: 1,
  },
  itemContainer: {
    flex: 1,
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 5,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 5,
  },
});
