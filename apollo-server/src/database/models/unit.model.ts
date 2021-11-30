import { Schema } from 'mongoose';

export const w40kUnitSchema = new Schema({
  id: { type: String, required: true },
  creationDate: { type: Date, required: true },
  lastUpdateDate: { type: Date },
  lang: { type: String, required: true },
  ownerId: { type: String, required: true },
  userGroupsId: { type: [String] },
  version: { type: String, required: true },
  name: { type: String, required: true },
  data: {
    description: { type: String },
    detail: { type: String },
    battlefieldRole: { type: String },
    powerRating: { type: Number },
    commandPoints: { type: Number },
    profiles: { type: Array },
    profilesDetail: { type: String },
    weapons: { type: Array },
    specialWeapon: {
      rule: { type: String },
      name: { type: String },
      weapons: { type: Array },
    },
    wargearOptions: { type: Array },
    anotherEquipment: { type: Array },
    abilities: { type: Array },
    factionKeywords: { type: Array },
    keywords: { type: Array },
  },
  pictures: {
    main: {
      url: { type: String },
      ref: { type: String },
    },
  },
});
