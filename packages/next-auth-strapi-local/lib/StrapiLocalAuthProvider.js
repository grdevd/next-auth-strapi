import CredentialsProviderModule from 'next-auth/providers/credentials';

let CredentialsProvider = CredentialsProviderModule

if (typeof CredentialsProviderModule.default === 'function') {
  CredentialsProvider = CredentialsProviderModule.default
}

export default function StrapiLocalAuthProvider(config, handler) {
  return CredentialsProvider({
    name: 'StrapiLocalAuth',
    credentials: {
      username: {
        label: config.locale?.username ?? 'Username',
        type: 'text',
      },
      password: {
        label: config.locale?.password ?? 'Password',
        type: 'password'
      }
    },
    async authorize(credentials) {
      try {
        const response = await fetch(`${config.api.endpoint}/auth/local`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            identifier: credentials.username,
            password: credentials.password
          })
        });

        if (response.ok) {
          const data = await response.json();

          if (handler) {
            await handler(data)
          }

          return data;
        }

        return null;
      } catch (error) {
        if (handler) {
          handler({ error })
        }

        return null;
      }
    }
  })
}
