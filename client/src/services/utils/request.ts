import 'whatwg-fetch'

const API_URL = '/v1/'

type FetchParams = {
  headers?: Object,
  method: 'GET' | 'POST',
  path: string,
  body: Object,
}

export default async function ({ headers = {}, method, path, body }: FetchParams): Promise<any> {
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }

  const options = {
    headers: Object.assign({}, defaultHeaders, headers),
    body: JSON.stringify(body),
    method
  }

  try {
    const response = await fetch(API_URL + path, options)
    if (response.status >= 200 && response.status < 300) {
      return response.status === 204 ? {} : response.json()
    }
    throw Error(`${response.status} - ${response.statusText}`)
  } catch(error) {
    throw new Error(error)
  }
}
