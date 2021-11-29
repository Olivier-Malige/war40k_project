export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type Abilities = {
  __typename?: 'Abilities';
  name: Scalars['String'];
  rule: Scalars['String'];
};

export type AbilitiesInput = {
  name: Scalars['String'];
  rule: Scalars['String'];
};

export enum BattlefieldRoles {
  DedicatedTransports = 'DedicatedTransports',
  Elites = 'Elites',
  FastAttacks = 'FastAttacks',
  Flyers = 'Flyers',
  HQs = 'HQs',
  HeavySupports = 'HeavySupports',
  LordOfWars = 'LordOfWars',
  Troops = 'Troops'
}

export type CreateUserInput = {
  disabled: Scalars['Boolean'];
  displayName?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  password: Scalars['String'];
  role: Roles;
};

export enum Lang {
  EnGb = 'en_GB',
  FrFr = 'fr_FR'
}

export type Mutation = {
  __typename?: 'Mutation';
  createUser?: Maybe<User>;
  createW40kUnit?: Maybe<W40kUnit>;
  deleteUsers?: Maybe<Scalars['Boolean']>;
  removeW40kUnits?: Maybe<Scalars['Boolean']>;
  updateUser?: Maybe<User>;
  updateW40kUnit?: Maybe<W40kUnit>;
};


export type MutationCreateUserArgs = {
  input?: Maybe<CreateUserInput>;
};


export type MutationCreateW40kUnitArgs = {
  input: W40kUnitInput;
};


export type MutationDeleteUsersArgs = {
  id: Array<Scalars['String']>;
};


export type MutationRemoveW40kUnitsArgs = {
  id: Array<Scalars['String']>;
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID'];
  input?: Maybe<UpdateUserInput>;
};


export type MutationUpdateW40kUnitArgs = {
  id: Scalars['String'];
  input: W40kUnitInput;
};

export type Name = {
  __typename?: 'Name';
  name?: Maybe<Scalars['String']>;
};

export type NameInput = {
  name?: Maybe<Scalars['String']>;
};

export type PictureInput = {
  firebaseStorageRef?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type PicturesInput = {
  main?: Maybe<PictureInput>;
};

export type Query = {
  __typename?: 'Query';
  searchW40kUnitsByName?: Maybe<W40kUnit>;
  user?: Maybe<User>;
  users?: Maybe<Array<Maybe<User>>>;
  w40kUnit?: Maybe<W40kUnit>;
  w40kUnits?: Maybe<Array<Maybe<W40kUnit>>>;
};


export type QuerySearchW40kUnitsByNameArgs = {
  name: Scalars['String'];
};


export type QueryUserArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QueryW40kUnitArgs = {
  id?: Maybe<Scalars['String']>;
};

export enum Roles {
  Admin = 'admin',
  Contributor = 'contributor',
  Tester = 'tester'
}

export type UnitPicture = {
  __typename?: 'UnitPicture';
  firebaseStorageRef?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type UnitPictures = {
  __typename?: 'UnitPictures';
  main?: Maybe<UnitPicture>;
};

export type UpdateUserInput = {
  disabled?: Maybe<Scalars['Boolean']>;
  displayName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  role?: Maybe<Roles>;
};

export type User = {
  __typename?: 'User';
  creationDate: Scalars['Date'];
  disabled: Scalars['Boolean'];
  displayName?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  id: Scalars['ID'];
  lastSignInDate: Scalars['Date'];
  role: Roles;
};

export type W40kUnit = {
  __typename?: 'W40kUnit';
  creationDate: Scalars['Date'];
  data?: Maybe<W40kUnitData>;
  id: Scalars['ID'];
  lang: Lang;
  lastUpdateDate?: Maybe<Scalars['Date']>;
  name: Scalars['String'];
  ownerId: Scalars['ID'];
  pictures?: Maybe<UnitPictures>;
  version?: Maybe<Scalars['String']>;
};

export type W40kUnitData = {
  __typename?: 'W40kUnitData';
  abilities?: Maybe<Array<Maybe<Abilities>>>;
  battlefieldRole?: Maybe<BattlefieldRoles>;
  commandPoints?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  detail?: Maybe<Scalars['String']>;
  factionKeywords?: Maybe<Array<Maybe<Name>>>;
  keywords?: Maybe<Array<Maybe<Name>>>;
  powerRating?: Maybe<Scalars['Int']>;
  profiles?: Maybe<Array<Maybe<W40kUnitProfile>>>;
  profilesDetail?: Maybe<Scalars['String']>;
  wargearOptions?: Maybe<Array<Maybe<Name>>>;
  weapons?: Maybe<Weapons>;
};

export type W40kUnitDataInput = {
  abilities?: Maybe<Array<Maybe<AbilitiesInput>>>;
  battlefieldRole?: Maybe<BattlefieldRoles>;
  commandPoints?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  detail?: Maybe<Scalars['String']>;
  factionKeywords?: Maybe<Array<Maybe<NameInput>>>;
  keywords?: Maybe<Array<Maybe<NameInput>>>;
  powerRating?: Maybe<Scalars['Int']>;
  profiles?: Maybe<Array<Maybe<W40kUnitProfileInput>>>;
  profilesDetail?: Maybe<Scalars['String']>;
  wargearOptions?: Maybe<Array<Maybe<NameInput>>>;
  weapons?: Maybe<WeaponsInput>;
};

export type W40kUnitInput = {
  data?: Maybe<W40kUnitDataInput>;
  lang: Lang;
  name: Scalars['String'];
  pictures?: Maybe<PicturesInput>;
  version: Scalars['String'];
};

export type W40kUnitProfile = {
  __typename?: 'W40kUnitProfile';
  attacks?: Maybe<Scalars['String']>;
  ballisticSkill?: Maybe<Scalars['String']>;
  leadership?: Maybe<Scalars['String']>;
  move?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  numberMax?: Maybe<Scalars['Int']>;
  numberMin?: Maybe<Scalars['Int']>;
  save?: Maybe<Scalars['String']>;
  strength?: Maybe<Scalars['String']>;
  toughness?: Maybe<Scalars['String']>;
  weaponSkill?: Maybe<Scalars['String']>;
  wounds?: Maybe<Scalars['String']>;
};

export type W40kUnitProfileInput = {
  attacks?: Maybe<Scalars['String']>;
  ballisticSkill?: Maybe<Scalars['String']>;
  leadership?: Maybe<Scalars['String']>;
  move?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  numberMax?: Maybe<Scalars['Int']>;
  numberMin?: Maybe<Scalars['Int']>;
  save?: Maybe<Scalars['String']>;
  strength?: Maybe<Scalars['String']>;
  toughness?: Maybe<Scalars['String']>;
  weaponSkill?: Maybe<Scalars['String']>;
  wounds?: Maybe<Scalars['String']>;
};

export type Weapon = {
  __typename?: 'Weapon';
  abilities?: Maybe<Scalars['String']>;
  armourPenetration?: Maybe<Scalars['String']>;
  damage?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  range?: Maybe<Scalars['Int']>;
  strength?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type WeaponInput = {
  abilities?: Maybe<Scalars['String']>;
  armourPenetration?: Maybe<Scalars['String']>;
  damage?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  range?: Maybe<Scalars['Int']>;
  strength?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type Weapons = {
  __typename?: 'Weapons';
  specialRule?: Maybe<Scalars['String']>;
  weapons?: Maybe<Array<Maybe<Weapon>>>;
};

export type WeaponsInput = {
  specialRule?: Maybe<Scalars['String']>;
  weapons?: Maybe<Array<Maybe<WeaponInput>>>;
};
