import React, {PureComponent} from 'react';
import {
  View,
  Text,
  FlatList,
  StatusBar,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import RenderItem from '../components/RenderCard';
import Nodata from '../components/NoData';
import {SearchBar} from 'react-native-elements';
import RBSheet from 'react-native-raw-bottom-sheet';
import Data from './static.json';
import RenderFilterData from '../components/RenderFilterData';
class componentName extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      refreshing: true,
      search: '',
      country: 'India',
      category: 'General',
      countryCode: 'in',
    };
  }
  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    Keyboard.dismiss(); // to remove the keyboard
    const url = `https://newsapi.org/v2/top-headlines?country=${this.state.countryCode}&category=${this.state.category}&apiKey=e9ed76ff6496462b8096d1e4b3178434`;
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
  condition = async (data) =>{
    console.log('aya')
    if(data.name){
      await this.setState({countryCode:data.code,country:data.name})
      this.Country.close();
    }
    else if(data.category){
      await this.setState({category:data.category})
        this.Category.close();
    }
    this.fetchData();
  }

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
        <RBSheet
          ref={ref => {
            this.Country = ref;
          }}
          closeOnDragDown
          customStyles={{
            container: {
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            },
          }}
          height={330}>
          <FlatList
            data={Data.country}
            renderItem={({item}) => (<RenderFilterData item={item} condition={this.condition}/>)}
          />
        </RBSheet>
        <RBSheet
          ref={ref => {
            this.Category = ref;
          }}
          closeOnDragDown
          customStyles={{
            container: {
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            },
          }}
          height={330}>
          <FlatList
            data={Data.category}
            renderItem={({item}) => (<RenderFilterData item={item} condition={this.condition}/>)}
          />
        </RBSheet>
        <View style={{height: 10, flexDirection: 'row'}}>
          <TouchableOpacity
            style={{flex: 1, left: 10}}
            onPress={() => this.Country.open()}>
            <Text>Country: {this.state.country}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{flex: 1, right: 10, alignItems: 'flex-end'}}
            onPress={() => this.Category.open()}>
            <Text>Category: {this.state.category}</Text>
          </TouchableOpacity>
        </View>
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
