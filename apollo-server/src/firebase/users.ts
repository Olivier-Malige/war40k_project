import admin, { auth } from 'firebase-admin';

import conf from '../environment';
import UserRecord = auth.UserRecord;
import { CreateUserInput, UpdateUserInput } from '../types';
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

const setCustomClaim = async (userID: string, role: string) => {
  try {
    return await admin.auth().setCustomUserClaims(userID, {
      role: role,
    });
  } catch (e) {
    throw Error(e);
  }
};

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

export const getUser = async (id: string): Promise<auth.UserRecord> => {
  try {
    return await admin.auth().getUser(id);
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const updateUser = async (id: string, input: UpdateUserInput): Promise<UserRecord> => {
  try {
    await admin.auth().updateUser(id, {
      email: input.email,
      displayName: input.displayName,
      password: input.password,
      disabled: input.disabled,
    });
    if (input.role) {
      await setCustomClaim(id, input.role);
    }
    return await admin.auth().getUser(id);
  } catch (e) {
    console.error(e);
    return e;
  }
};
export const createUser = async (input: CreateUserInput): Promise<UserRecord> => {
  try {
    const user = await admin.auth().createUser({
      email: input.email,
      displayName: input.displayName,
      password: input.password,
    });
    await setCustomClaim(user.uid, input.role);
    return await admin.auth().getUser(user.uid);
  } catch (e) {
    console.error(e);
    return e;
  }
};

export const deleteUsers = async (ids: string[]): Promise<boolean> => {
  try {
    await admin.auth().deleteUsers(ids);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};
