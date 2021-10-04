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
  removeUser?: Maybe<Scalars['Boolean']>;
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


export type MutationRemoveUserArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type MutationRemoveW40kUnitsArgs = {
  id: Array<Scalars['String']>;
};


export type MutationUpdateUserArgs = {
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

export type Query = {
  __typename?: 'Query';
  searchW40kUnitsByName?: Maybe<W40kUnit>;
  users?: Maybe<Array<Maybe<User>>>;
  w40kUnit?: Maybe<W40kUnit>;
  w40kUnits?: Maybe<Array<Maybe<W40kUnit>>>;
};


export type QuerySearchW40kUnitsByNameArgs = {
  name: Scalars['String'];
};


export type QueryW40kUnitArgs = {
  id?: Maybe<Scalars['String']>;
};

export enum Roles {
  Admin = 'admin',
  Contributor = 'contributor',
  Tester = 'tester'
}

export type UpdateUserInput = {
  disabled?: Maybe<Scalars['Boolean']>;
  displayName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  password?: Maybe<Scalars['String']>;
  role?: Maybe<Roles>;
};

export type User = {
  __typename?: 'User';
  disabled: Scalars['Boolean'];
  displayName?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  id: Scalars['ID'];
  role: Roles;
};

export type W40kUnit = {
  __typename?: 'W40kUnit';
  abilities?: Maybe<Array<Maybe<Abilities>>>;
  battlefieldRole?: Maybe<BattlefieldRoles>;
  commandPoints?: Maybe<Scalars['Int']>;
  creationDate: Scalars['Date'];
  description?: Maybe<Scalars['String']>;
  detail?: Maybe<Scalars['String']>;
  factionKeywords?: Maybe<Array<Maybe<Name>>>;
  id: Scalars['ID'];
  keywords?: Maybe<Array<Maybe<Name>>>;
  lang: Lang;
  lastUpdateDate?: Maybe<Scalars['Date']>;
  name: Scalars['String'];
  pictureUrl?: Maybe<Scalars['String']>;
  powerRating: Scalars['Int'];
  profiles?: Maybe<Array<Maybe<W40kUnitProfile>>>;
  profilesDetail?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['String']>;
  wargearOptions?: Maybe<Array<Maybe<Name>>>;
  weapons?: Maybe<Array<Maybe<Weapon>>>;
};

export type W40kUnitInput = {
  abilities?: Maybe<Array<Maybe<AbilitiesInput>>>;
  battlefieldRole?: Maybe<BattlefieldRoles>;
  commandPoints?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  detail?: Maybe<Scalars['String']>;
  factionKeywords?: Maybe<Array<Maybe<NameInput>>>;
  keywords?: Maybe<Array<Maybe<NameInput>>>;
  lang: Lang;
  name: Scalars['String'];
  pictureUrl?: Maybe<Scalars['String']>;
  powerRating: Scalars['Int'];
  profiles?: Maybe<Array<Maybe<W40kUnitProfileInput>>>;
  profilesDetail?: Maybe<Scalars['String']>;
  version: Scalars['String'];
  wargearOptions?: Maybe<Array<Maybe<NameInput>>>;
  weapons?: Maybe<Array<Maybe<WeaponInput>>>;
};

export type W40kUnitProfile = {
  __typename?: 'W40kUnitProfile';
  attacks?: Maybe<Scalars['Int']>;
  ballisticSkill?: Maybe<Scalars['Int']>;
  leadership?: Maybe<Scalars['Int']>;
  move?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  numberMax?: Maybe<Scalars['Int']>;
  numberMin?: Maybe<Scalars['Int']>;
  save?: Maybe<Scalars['Int']>;
  strength?: Maybe<Scalars['Int']>;
  toughness?: Maybe<Scalars['Int']>;
  weaponSkill?: Maybe<Scalars['Int']>;
  wounds?: Maybe<Scalars['Int']>;
};

export type W40kUnitProfileInput = {
  attacks?: Maybe<Scalars['Int']>;
  ballisticSkill?: Maybe<Scalars['Int']>;
  leadership?: Maybe<Scalars['Int']>;
  move?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  numberMax?: Maybe<Scalars['Int']>;
  numberMin?: Maybe<Scalars['Int']>;
  save?: Maybe<Scalars['Int']>;
  strength?: Maybe<Scalars['Int']>;
  toughness?: Maybe<Scalars['Int']>;
  weaponSkill?: Maybe<Scalars['Int']>;
  wounds?: Maybe<Scalars['Int']>;
};

export type Weapon = {
  __typename?: 'Weapon';
  abilities?: Maybe<Scalars['String']>;
  armourPenetration?: Maybe<Scalars['Int']>;
  damage?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  range?: Maybe<Scalars['Int']>;
  strength?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
};

export type WeaponInput = {
  abilities?: Maybe<Scalars['String']>;
  armourPenetration?: Maybe<Scalars['Int']>;
  damage?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  range?: Maybe<Scalars['Int']>;
  strength?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
};

export type Weapons = {
  __typename?: 'Weapons';
  specialRule?: Maybe<Scalars['String']>;
  weapons?: Maybe<Array<Maybe<Weapon>>>;
};

export type WeaponsInput = {
  rule?: Maybe<Scalars['String']>;
  weapon?: Maybe<Array<Maybe<WeaponInput>>>;
};
