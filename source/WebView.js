import React, {PureComponent} from 'react';
import {View} from 'react-native';
import Webview from 'react-native-webview';
export default class WebView extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  backPress = () => {
    this.props.navigation.goBack();
  };
  render() {
    const {navigation} = this.props;
    const url = navigation.getParam('url');
    const title = navigation.getParam('title');
    return (
      <View style={{flex: 1}}>
        <Header title={title} backPress={this.backPress} />
        <Webview source={{uri: url}} />
      </View>
    );
  }
}
