import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { graphql } from "gatsby"

export const query = graphql`
  query w40kUnit($unitId: String!) {
    warApi {
      w40kUnit(id: $unitId) {
        name
        pictures {
          main {
            url
          }
        }

        data {
          keywords {
            name
          }
          factionKeywords {
            name
          }
          description
          profiles {
            numberMin
            numberMax
            name
            move
            weaponSkill
            ballisticSkill
            strength
            toughness
            wounds
            attacks
          }
          abilities {
            name
            rule
          }
          weapons {
            name
            range
            type
            strength
            armourPenetration
            damage
            abilities
          }
        }
      }
    }
  }
`

const Unit = ({ data }: { data: any }) => {
  const src = data?.warApi?.w40kUnit?.pictures?.main?.url
  const unit = data.warApi.w40kUnit
  return (
    <Layout>
      <Seo title={data.warApi.w40kUnit.name} />
      <h1>{unit.name}</h1>
      <img src={src} alt="" />

      <div>{unit.data.description}</div>
      <div>
        {unit.data.keywords.map((keyword: any) => (
          <span> {keyword.name} </span>
        ))}
      </div>
      <div>
        {unit.data.factionKeywords.map((keyword: any) => (
          <span> {keyword.name} </span>
        ))}
      </div>
      <div>
        {unit.data.profiles.map((profile: any) => (
          <>
            <span> {profile.numberMin} </span>
            <span> {profile.numberMax} </span>
            <span> {profile.name} </span>
            <span> {profile.move} </span>
            <span> {profile.weaponSkill} </span>
            <span> {profile.ballisticSkill} </span>
            <span> {profile.strength} </span>
          </>
        ))}
      </div>
    </Layout>
  )
}

export default Unit
