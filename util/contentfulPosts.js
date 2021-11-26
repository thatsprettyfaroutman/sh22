const R = require('ramda')

const space = process.env.CONTENTFUL_SPACE_ID
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN

const client = require('contentful').createClient({
  space,
  accessToken,
})

function fixItem(item) {
  if (Array.isArray(item)) {
    return item.map(fixItem)
  }
  if (item.fields && item.sys) {
    const contentType = item.sys.contentType.sys.id
    return Object.entries(item.fields)
      .map(([key, field]) => {
        return [key, fixItem(field)]
      })
      .reduce(
        (acc, [key, field]) => {
          acc[key] = field
          return acc
        },
        { contentType }
      )
  }
  return item
}

export async function getHomeSections() {
  const { items } = await client.getEntries({
    content_type: 'homePage',
    include: 1,
  })

  if (!items) {
    console.log(`Error getting HomeSections.`)
  }

  return fixItem(items[0].fields.sections).map((section) => ({
    ...R.omit(['post'], section),
    link: section.contentType.toLowerCase().replace('section', ''),
  }))
}

export async function getSection(contentType) {
  const { items } = await client.getEntries({
    content_type: contentType,
    include: 1,
  })
  if (!items) {
    console.log(`Error getting Entries for ${contentType}.`)
  }

  return fixItem(items[0])
}

export default { getHomeSections, getSection }
