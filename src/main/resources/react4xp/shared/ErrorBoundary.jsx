import { Component } from 'react'
import PropTypes from 'prop-types'

export class ErrorBoundary extends Component {
  constructor (props) {
    super(props)

    this.state = { hasError: false }
  }

  static getDerivedStateFromError (error) {
    if (error) {
      if (console && console.error) {
        console.error(error.message)
      } else {
        if (log && log.info) {
          log.info(error.message)
        }
      }
    }

    return { hasError: true }
  }

  componentDidCatch (error, info) {
    this.setState({ hasError: true, info, error })
  }

  render () {
    if (this.state.hasError) {
      return (
        <h1>Something went wrong.</h1>
      )
    }

    return this.props.children
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

ErrorBoundary.defaultProps = {
  children: null
}

export default (props) => <ErrorBoundary {...props} /> // eslint-disable-line react/display-name
