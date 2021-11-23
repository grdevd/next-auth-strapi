export default function createSignInCallback(config, handler) {
  return async function handleSignInCallbackAsync(props) {
    let success = props.user && !props.user.user.blocked

    if (handler) {
      success = Boolean(await handler(props))
    }

    return success
  }
}
