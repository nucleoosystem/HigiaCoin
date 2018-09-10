import React from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'
import { Appbar } from 'react-native-paper'

const Navbar = props => {
  const {
    title,
    subtitle,
    color,
    icon,
    backWithText,
    backOnlyIcon,
    navigation
  } = props

  return (
    <Appbar.Header>
      {backWithText ? (
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <Appbar.BackAction
            color='black'
            onPress={() => navigation.goBack()}
          />
          <Text style={{ fontWeight: '500' }}>Back</Text>
        </View>
      ) : null}
      {backOnlyIcon ? (
        <Appbar.BackAction color='black' onPress={() => navigation.goBack()} />
      ) : null}
      {title && subtitle ? (
        <Appbar.Content
          title={title}
          subtitle={subtitle}
          color={color}
          titleStyle={styles.title}
        />
      ) : null}
      {icon ? (
        <Appbar.Action
          icon={icon}
          color={color}
          onPress={() => navigation.navigate('Filters')}
        />
      ) : null}
    </Appbar.Header>
  )
}

const styles = {
  title: {
    fontWeight: '500'
  }
}

Navbar.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  color: PropTypes.string,
  icon: PropTypes.string,
  navigation: PropTypes.object,
  backWithText: PropTypes.bool,
  backOnlyIcon: PropTypes.bool
}

export default Navbar