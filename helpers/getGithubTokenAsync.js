import { AuthSession } from 'expo';

const REDIRECT_URL = AuthSession.getRedirectUrl();

const github = {
  id: '56948eeb5f5d57ed90b8',
  secret: '4eac15929576d3c683179c00315a1a7989b3d96f',
};

const githubFields = [
  'user',
  'public_repo',
  'repo',
  'repo_deployment',
  'repo:status',
  'read:repo_hook',
  'read:org',
  'read:public_key',
  'read:gpg_key',
];

function authUrlWithId(id, fields) {
  return (
    `https://github.com/login/oauth/authorize` +
    `?client_id=${id}` +
    `&redirect_uri=${encodeURIComponent(REDIRECT_URL)}` +
    `&scope=${encodeURIComponent(fields.join(' '))}`
  );
}

const createTokenWithCode = async (code) => {
  const url =
    `https://github.com/login/oauth/access_token` +
    `?client_id=${github.id}` +
    `&client_secret=${github.secret}` +
    `&code=${code}`;
  
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

    const { access_token } = await res.json();
  return access_token;
}

async function getGithubTokenAsync() {
  try {
    const { type, params } = await AuthSession.startAsync({
      authUrl: authUrlWithId(github.id, githubFields),
    });

    if (type !== 'success') {
      return null;
    }
    if (params.error) {
      const { error, error_description, error_uri } = params;
      if (error === 'redirect_uri_mismatch') {
        console.warn(
          `Please set the "Authorization callback URL" in your Github application settings to ${REDIRECT_URL}`
        );
      }
       console.warn(
          `Please set ${error}  ${error_description}`
        );
      throw new Error(`Github Auth: ${error}  ${error_description}`);
    }

    const access_token = await createTokenWithCode(
      params.code
    );

  
    return access_token;
  } catch ({ message }) {
    throw new Error(`Github Auth: ${message}`);
  }
}

export default getGithubTokenAsync;
