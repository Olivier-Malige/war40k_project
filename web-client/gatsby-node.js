const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ actions, graphql, reporter }) => {
  const result = await graphql(`
    query {
      warApi {
        w40kUnits {
          id
          name
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panic("Error loading w40kUnits!", reporter.errors)
  }

  result.data.warApi?.w40kUnits?.forEach(unit => {
    actions.createPage({
      path: `warhammer4000/units/${unit.name}`,
      component: require.resolve("./src/templates/w40kUnit.tsx"),
      context: {
        unitId: unit.id,
      },
    })
  })
}
