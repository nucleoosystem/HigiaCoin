import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { View, ScrollView, ActivityIndicator } from 'react-native'
import { List as PaperList } from 'react-native-paper'

import ListItem from './../ListItem'

const renderItems = cryptocurrencies => {
  if (cryptocurrencies.length > 0) {
    return cryptocurrencies.map((cryptocurrency, i) => {
      /* eslint-disable-next-line */
      const { price, volume_24h, market_cap } = cryptocurrency.quotes['USD']
      const {
        id,
        name,
        symbol,
        circulating_supply /* eslint-disable-line */,
        max_supply /* eslint-disable-line */
      } = cryptocurrency

      return (
        <ListItem
          key={id}
          ranking={++i}
          title={name}
          symbol={symbol}
          price={price}
          volume={volume_24h} /* eslint-disable-line */
          marketCap={market_cap} /* eslint-disable-line */
          circulatingSupply={circulating_supply} /* eslint-disable-line */
          maxSupply={max_supply} /* eslint-disable-line */
        />
      )
    })
  }
}

const List = ({ cryptocurrencies, loading }) => (
  <ScrollView style={{ marginTop: '20%', backgroundColor: 'white' }}>
    {loading ? (
      <View style={{ marginTop: '50%' }}>
        <ActivityIndicator size='large' color='#000' />
      </View>
    ) : (
      <PaperList.Section>{renderItems(cryptocurrencies)}</PaperList.Section>
    )}
  </ScrollView>
)

List.propTypes = {
  cryptocurrencies: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  loading: PropTypes.bool
}

const mapStateToProps = state => {
  const { loading } = state.cryptos

  return { loading }
}

export default connect(
  mapStateToProps,
  null
)(List)
