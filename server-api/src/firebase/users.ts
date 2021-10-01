import admin from 'firebase-admin';

import conf from '../environment';
const env = conf[process.env.NODE_ENV as 'development' | 'production'];

const params = {
  type: env.firebase.type,
  projectId: env.firebase.project_id,
  privateKeyId: env.firebase.private_key_id,
  privateKey: env.firebase.private_key,
  clientEmail: env.firebase.client_email,
  clientId: env.firebase.client_id,
  authUri: env.firebase.auth_uri,
  tokenUri: env.firebase.token_uri,
  authProviderX509CertUrl: env.firebase.auth_provider_x509_cert_url,
  clientC509CertUrl: env.firebase.client_x509_cert_url,
};

admin.initializeApp({
  credential: admin.credential.cert(params),
});

export const verifyUserToken = async (idToken: string): Promise<admin.auth.DecodedIdToken> => {
  if (!idToken) return null;
  try {
    return await admin.auth().verifyIdToken(idToken);
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const listUsers = async (): Promise<admin.auth.ListUsersResult> => {
  try {
    return await admin.auth().listUsers();
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const updateUser = async (id, data) => {
  try {
    const user = await admin.auth().updateUser(id, {
      email: data.email,
      displayName: data.displayName,
    });
    return user;
  } catch (e) {
    console.error(e);
    return null;
  }
};
export const createUser = async data => {
  return data;
};
export const disableUser = async id => {
  return id;
};
export const removeUser = async id => {
  return id;
};
