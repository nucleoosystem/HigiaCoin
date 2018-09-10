import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { DefaultTheme, Drawer, Checkbox } from 'react-native-paper'
import { View, Linking } from 'react-native'

import Navbar from './../Navbar'

import { selectFilter } from './../../actions/FiltersActions'

const drawerTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'gray'
  }
}

class Filters extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <Navbar
        title='Filters & Settings'
        color='white'
        backOnlyIcon
        navigation={navigation}
      />
    )
  })

  onFilterItems (filter) {
    const { navigation, selectFilter } = this.props
    selectFilter(filter)
    navigation.navigate('Home', { selectedFilter: filter })
  }

  openRepositoryWebsite () {
    const url = 'https://github.com/bntzio/higiacoin'
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url)
      } else {
        console.log(`Cannot open URI: ${url}`)
      }
    })
  }

  render () {
    const { activeFilter } = this.props

    return (
      <View
        style={{ marginTop: '15%', height: '100%', backgroundColor: 'white' }}
      >
        <Drawer.Section
          title='Filter by'
          theme={drawerTheme}
          style={{ marginTop: '9%' }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 8
            }}
          >
            <Checkbox
              status={activeFilter === 'Market Cap' ? 'checked' : 'unchecked'}
              onPress={() => this.onFilterItems('Market Cap')}
            />
            <Drawer.Item
              label='Market Cap'
              style={{ marginLeft: -2, flex: 1 }}
              onPress={() => this.onFilterItems('Market Cap')}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 8
            }}
          >
            <Checkbox
              status={activeFilter === 'Price' ? 'checked' : 'unchecked'}
              onPress={() => this.onFilterItems('Price')}
            />
            <Drawer.Item
              label='Price'
              style={{ marginLeft: -2, flex: 1 }}
              onPress={() => this.onFilterItems('Price')}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 8
            }}
          >
            <Checkbox
              status={activeFilter === 'Volume' ? 'checked' : 'unchecked'}
              onPress={() => this.onFilterItems('Volume')}
            />
            <Drawer.Item
              label='Volume (24H)'
              style={{ marginLeft: -2, flex: 1 }}
              onPress={() => this.onFilterItems('Volume')}
            />
          </View>
        </Drawer.Section>

        <Drawer.Section
          title='Information'
          theme={drawerTheme}
          style={{ marginTop: 10 }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 8
            }}
          >
            <Drawer.Item
              label='Source Code'
              style={{ marginLeft: 0, flex: 1 }}
              onPress={() => this.openRepositoryWebsite()}
            />
          </View>
        </Drawer.Section>
      </View>
    )
  }
}

Filters.propTypes = {
  navigation: PropTypes.object,
  selectFilter: PropTypes.func,
  activeFilter: PropTypes.string
}

const mapStateToProps = state => {
  const { activeFilter } = state.filters

  return { activeFilter }
}

export default connect(
  mapStateToProps,
  {
    selectFilter
  }
)(Filters)
