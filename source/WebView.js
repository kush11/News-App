import React, {PureComponent} from 'react';
import {View} from 'react-native';
import Webview from 'react-native-webview';
import Header from '../components/Header';

export default class WebView extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.props.navigation.setOptions({ title: this.props.route.params.title })
  }
  backPress = () => {
    const {navigation} = this.props;
    navigation.goBack();
  };
  render() {
    const {route} = this.props;

    const url = route.params.url;
    const title = route.params.title;
    return (
      <View style={{flex: 1}}>
        {/* <Header title={title} nav={this.props.navigation} backPress={this.backPress} /> */}
        <Webview source={{uri: url}} />
      </View>
    );
  }
}
