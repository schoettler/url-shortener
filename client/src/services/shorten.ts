import request from './utils/request'

type URLShortenParams = {
  target: string,
}

type URLShortenResponse = {
  hash: string
  target: string
}

export const shorten = (params: URLShortenParams): Promise<URLShortenResponse> =>
  request({
    path: 'url',
    method: 'POST',
    body: params,
  })
