export default function createJwtCallback(config, handler) {
  return async function handleJwtCallbackAsync(props) {
    if (props.user) {
      props.token.accessToken = props.user.jwt
      props.token.name = props.user.user.username
      props.token.email = props.user.user.email
      props.token.userId = props.user.user.id
      props.token.role = props.user.user.role
    }

    if (handler) {
      await handler(props)
    }

    return props.token
  }
}
