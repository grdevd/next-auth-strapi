export default function createSessionCallback(config, handler) {
  return async function handleSessionCallbackAsync(props) {
    try {
      const response = await fetch(`${config.api.endpoint}/users/me`, {
        headers: {
          Authorization: `Bearer ${props.token.accessToken}`
        },
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }
      const result = await response.json();
      props.session.accessToken = props.token.accessToken;
      props.session.user.id = result.id;
      props.session.user.role = result.role;

      if (handler) {
        await handler(props)
      }

      return props.session;
    } catch (error) {
      props.error = error
      await handler(props)
      return false;
    }
  }
}
