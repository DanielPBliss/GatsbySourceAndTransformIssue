const path = require("path")

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const result = await graphql(
    `
      {
        allExampleDataCSV {
          nodes {
            id
            firstname
            lastname
            email
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your Contentful posts`,
      result.errors
    )
    return
  }

  const data = result.data.allExampleDataCSV.nodes

  if (data.length > 0) {
    data.forEach((row, index) => {
      if (row !== null && row !== undefined) {
        console.log("Create page for " + row.id)
      }
    })
  }
}
