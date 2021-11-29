const R = require('ramda')

const space = process.env.CONTENTFUL_SPACE_ID
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN

const client = require('contentful').createClient({
  space,
  accessToken,
})

function fixItem(item) {
  if (R.isNil(item)) {
    return item
  }
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

  const item = items[0]
  if (R.isNil(item)) {
    console.log(`Error getting HomeSections.`)
  }

  // if (R.isNil(item)) {
  //   return [
  //     {
  //       contentType: 'heroSection',
  //       link: 'hero',
  //       title:
  //         'Hoxhunt Summer Hunters internship program will be the runway of your career',
  //       button: 'Apply now',
  //     },
  //     {
  //       contentType: 'aboutSection',
  //       link: 'about',
  //       title: 'What is Hoxhunt?',
  //       description:
  //         'We help companies turn their employees into their strongest asset in cybersecurity with our gamified platform that trains employees against phishing in a fun and engaging way simulating real-life phishing attacks.',
  //       button: 'Read more',
  //     },
  //   ]
  // }

  return fixItem(item.fields.sections).map((section) => {
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
