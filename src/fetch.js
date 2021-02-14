import nodefetch from 'node-fetch'

const globalFetch = typeof fetch === 'undefined' ? nodefetch : fetch

export default globalFetch
