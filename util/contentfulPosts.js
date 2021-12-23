const R = require('ramda')

const space = process.env.CONTENTFUL_SPACE_ID
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN

const client = require('contentful').createClient({
  space,
  accessToken,
})

function getItemFields(item) {
  if (R.isNil(item)) {
    return item
  }
  if (Array.isArray(item)) {
    return item.map(getItemFields)
  }
  if (item.fields && item.sys) {
    const contentType =
      item.sys.contentType?.sys?.id || item.fields.file?.contentType

    return Object.entries(item.fields)
      .map(([key, field]) => {
        return [key, getItemFields(field)]
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
    include: 2,
  })

  const item = items[0]
  if (R.isNil(item)) {
    console.log(`Error getting HomeSections.`)
  }

  return getItemFields(item.fields.sections).map((section) => {
    let link = section.contentType.toLowerCase().replace('section', '')
    if (link === 'alumn') {
      link = 'alumni'
    }
    return {
      ...R.omit(['post'], section),
      link,
    }
  })
}

export async function getSeo() {
  const { items } = await client.getEntries({
    content_type: 'homePage',
    include: 2,
  })
  const item = items[0]
  if (R.isNil(item)) {
    console.log(`Error getting Seo.`)
  }

  const seoItem = R.pipe(
    R.toPairs,
    R.filter(([key]) => key.startsWith('seo')),
    R.map(([key, field]) => [key, getItemFields(field)]),
    R.map(([key, field]) =>
      key === 'seoImage' ? [key, field.file.url] : [key, field]
    ),
    R.fromPairs
  )(item.fields)

  return seoItem
}

export async function getSection(contentType) {
  const { items } = await client.getEntries({
    content_type: contentType,
    include: 1,
  })

  if (!items) {
    console.log(`Error getting Entries for ${contentType}.`)
  }

  return getItemFields(items[0])
}

}

export default { getHomeSections, getSection }
