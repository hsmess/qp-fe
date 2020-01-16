/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

async function createNewsPages (graphql, actions, reporter) {
    const {createPage} = actions
    const result = await graphql(`
   {
     allSanityNews {
        edges {
          node {
                id
                title
                }
            }
        }
        }
  `)

    if (result.errors) throw result.errors

    const storyEdges = (result.data.allSanityNews || {}).edges || []
    storyEdges
        .forEach(edge => {
            // console.log(edge.node);
            const id = edge.node.id
            const slug = slugify(edge.node.title,edge.node.id)
            const path = `/news/${slug}/`

            reporter.info(`Creating news page: ${path}`)

            createPage({
                path,
                component: require.resolve('./src/templates/news.js'),
                context: {id}
            })
        })
}

function slugify(string, id = null) {
    const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
    const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnooooooooprrsssssttuuuuuuuuuwxyyzzz------'
    const p = new RegExp(a.split('').join('|'), 'g')

    var parsedString = id !== null ? string.toString().toLowerCase().substring(0,29) : string.toString().toLowerCase();

    parsedString = parsedString.toString().toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
        .replace(/&/g, '-and-') // Replace & with 'and'
        .replace(/[^\w\-]+/g, '') // Remove all non-word characters
        .replace(/\-\-+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, '') // Trim - from end of text

    if(id !== null)
    {
        parsedString = parsedString + "-" + id
    }
    return parsedString
}

exports.createPages = async ({graphql, actions, reporter}) => {
    await createNewsPages(graphql, actions, reporter)
    // await createHistoryPages(graphql, actions, reporter),
    // await createVenuePages(graphql, actions, reporter),
    // await createEventPages(graphql, actions, reporter),
    // await createListingPages(graphql, actions, reporter),
    // await createAboutPages(graphql, actions, reporter),
    // await createYourVisitPages(graphql, actions, reporter)
}
