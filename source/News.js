import React, {PureComponent} from 'react';
import {View, Text, FlatList, StatusBar} from 'react-native';
import RenderItem from '../components/RenderCard';
import Nodata from '../components/NoData';
class componentName extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      refreshing: true,
    };
  }
  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    const url =
      'https://newsapi.org/v2/top-headlines?country=us&apiKey=e9ed76ff6496462b8096d1e4b3178434';
    await fetch(url, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(responseJson =>
        this.setState({data: responseJson.articles}, () =>
          this.setState({refreshing: false}),
        ),
      )
      .catch(err => console.log('err', err));
  };
  refreshData = () => {
    this.setState({refreshing: false});
  };
  pressed = (title, url) => {
    this.props.navigation.navigate('WebView', {
      title,
      url,
    });
  };
  render() {
    return (
      <View style={{flex: 1}}>
        {/* <StatusBar
          backgroundColor="transparent"
          hidden={true}
          translucent={true}
          barStyle="light-content"
        /> */}
        {this.state.data.length > 0 ? (
          <FlatList
            data={this.state.data}
            renderItem={({item}) => (
              <RenderItem item={item} pressed={this.pressed} />
            )}
            keyExtractor={(item, index) => index.toString()}
            refreshing={this.state.refreshing}
            onRefresh={this.refreshData}
          />
        ) : (
          <Nodata />
        )}
      </View>
    );
  }
}

export default componentName;
