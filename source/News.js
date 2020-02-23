import React, {PureComponent} from 'react';
import {View, Text, FlatList, StatusBar, Keyboard} from 'react-native';
import RenderItem from '../components/RenderCard';
import Nodata from '../components/NoData';
import {SearchBar} from 'react-native-elements';

class componentName extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      refreshing: true,
      search: '',
    };
  }
  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    Keyboard.dismiss(); // to remove the keyboard
    const url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=e9ed76ff6496462b8096d1e4b3178434&pageSize=50`;
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
    console.log('ref');
    this.setState({refreshing: false});
  };
  pressed = (title, url) => {
    this.props.navigation.navigate('WebView', {
      title,
      url,
    });
  };
  updateSearch = search => {
    this.setState({search});
    if (search === '') this.fetchData();
    else {
      const url = `https://newsapi.org/v2/everything?q=${search}&apiKey=e9ed76ff6496462b8096d1e4b3178434`;
      fetch(url, {
        method: 'GET',
      })
        .then(response => response.json())
        .then(responseJson =>
          this.setState({data: responseJson.articles}, () =>
            this.setState({refreshing: false}),
          ),
        )
        .catch(err => console.log('err', err));
    }
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <SearchBar
          lightTheme
          icon={{type: 'font-awesome', name: 'search'}}
          placeholder="Search Here..."
          onChangeText={this.updateSearch}
          onClear={this.fetchData}
          value={this.state.search}
        />
        {/* <StatusBar
          backgroundColor="transparent"
          hidden={true}
          translucent={true}
          barStyle="light-content"
        /> */}
        {this.state.data != 'undefined' && this.state.data.length > 0 ? (
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
