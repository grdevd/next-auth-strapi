import PropTypes from 'prop-types'
import { useSession } from 'next-auth/react'

export default function AuthSuspense({ fallback, children }) {
  const { status } = useSession()

  if (status === 'loading') {
    return fallback
  }

  return children
}

AuthSuspense.propTypes = {
  fallback: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired
}

AuthSuspense.defaultProps = {
}
