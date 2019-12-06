/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

async function createHistoryPages (graphql, actions, reporter) {
    const {createPage} = actions
    const result = await graphql(`
   {
     allSanityStory {
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

    const storyEdges = (result.data.allSanityStory || {}).edges || []
    storyEdges
        .forEach(edge => {
            // console.log(edge.node);
            const id = edge.node.id
            const slug = slugify(edge.node.title)
            const path = `/story/${slug}/`

            reporter.info(`Creating story page: ${path}`)

            createPage({
                path,
                component: require.resolve('./src/templates/story.js'),
                context: {id}
            })
        })
}

async function createVenuePages (graphql, actions, reporter) {
    const {createPage} = actions
    const result = await graphql(`
   {
     allSanityVenue {
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

    const venueEdges = (result.data.allSanityVenue || {}).edges || []
    venueEdges
        .forEach(edge => {
            // console.log(edge.node);
            const id = edge.node.id
            const slug = slugify(edge.node.title)
            const path = `/venues/${slug}/`

            reporter.info(`Creating venue page: ${path}`)

            createPage({
                path,
                component: require.resolve('./src/templates/venue.js'),
                context: {id}
            })
        })
}

async function createEventPages (graphql, actions, reporter) {
    const {createPage} = actions
    const result = await graphql(`
   {
     allSanityP2Event {
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

    const eventEdges = (result.data.allSanityP2Event || {}).edges || []
    eventEdges
        .forEach(edge => {
            // console.log(edge.node);
            const id = edge.node.id
            const slug = slugify(edge.node.title, edge.node.id)
            const path = `/event/${slug}/`

            reporter.info(`Creating event page: ${path}`)

            createPage({
                path,
                component: require.resolve('./src/templates/event.js'),
                context: {id}
            })
        })
}

async function createListingPages (graphql, actions, reporter) {
    const {createPage} = actions
    const result = await graphql(`
   {
     allSanityP2Listing {
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

    const listingEdges = (result.data.allSanityP2Listing|| {}).edges || []
    listingEdges
        .forEach(edge => {
            // console.log(edge.node);
            const id = edge.node.id
            const slug = slugify(edge.node.title, edge.node.id)
            const path = `/listing/${slug}/`

            reporter.info(`Creating listing page: ${path}`)

            createPage({
                path,
                component: require.resolve('./src/templates/listing.js'),
                context: {id}
            })
        })
}

async function createAboutPages (graphql, actions, reporter) {
    const {createPage} = actions
    const result = await graphql(`
   {
     allSanityP2AboutPageItem {
        edges {
          node {
                id
                title
                genericPageSection{
                 title
                }
                }
            }
        }
   }
  `);


    if (result.errors) throw result.errors

    const aboutEdges = (result.data.allSanityP2AboutPageItem || {}).edges || []
    aboutEdges
        .forEach(edge => {
            if(edge.node.genericPageSection && edge.node.genericPageSection.length > 0)
            {
                const id = edge.node.id
                const slug = slugify(edge.node.title, edge.node.id)
                const path = `/about/${slug}/`

                reporter.info(`Creating about page: ${path}`)

                createPage({
                    path,
                    component: require.resolve('./src/templates/about.js'),
                    context: {id}
                })
            }
        })
}
async function createYourVisitPages (graphql, actions, reporter) {
    const {createPage} = actions
    const result = await graphql(`
   {
     allSanityP2YourVisitPageItem {
        edges {
          node {
                id
                title
                genericPageSection{
                 title
                }
                }
            }
        }
   }
  `);


    if (result.errors) throw result.errors

    const yourVisitEdges = (result.data.allSanityP2YourVisitPageItem || {}).edges || []
    yourVisitEdges
        .forEach(edge => {
            reporter.info(edge.node.genericPageSection.length)
            if(edge.node.genericPageSection && edge.node.genericPageSection.length > 0)
            {
                const id = edge.node.id
                const slug = slugify(edge.node.title, edge.node.id)
                const path = `/your-visit/${slug}/`

                reporter.info(`Creating your visit page: ${path}`)

                createPage({
                    path,
                    component: require.resolve('./src/templates/yourVisit.js'),
                    context: {id}
                })
            }
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
    // await createStoryPages(graphql, actions, reporter),
    // await createHistoryPages(graphql, actions, reporter),
    // await createVenuePages(graphql, actions, reporter),
    // await createEventPages(graphql, actions, reporter),
    // await createListingPages(graphql, actions, reporter),
    // await createAboutPages(graphql, actions, reporter),
    // await createYourVisitPages(graphql, actions, reporter)
}
