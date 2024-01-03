'use client'

import _ from 'lodash'
import { useState, useEffect } from 'react'
import { useDeepCompareEffect } from 'rooks'
import { useLiveQuery } from '@sanity/preview-kit'
import { useAppContext } from '@/stores/AppContext'
import { client } from '@/utils/sanity/client'

type Params<QueryResult> = Parameters<typeof useLiveQuery<QueryResult>>

export default function useQuery<QueryResult>(
  ...params: Params<QueryResult>
): [QueryResult, boolean, boolean] {
  const [initialData, query, queryParams = {}] = params

  const { isPreview } = useAppContext().state

  // client state
  const [fetchResult, setFetchResult] = useState<QueryResult>(initialData)
  const [fetchLoading, setFetchLoading] = useState(false)

  const liveResult = useLiveQuery<QueryResult>(...params)
  const enabled = liveResult[2]

  if (isPreview && !enabled) {
    throw new Error('not wrapped in a LiveQueryProvider')
  }

  // production
  useDeepCompareEffect(() => {
    if (!isPreview) {
      if (!_.isEmpty(initialData)) {
        // skip fetching
        setFetchResult(initialData)
      } else {
        setFetchLoading(true)
        client
          .fetch<QueryResult>(query, queryParams)
          .then(res => setFetchResult(res))
          .catch(err => console.error(err))
          .finally(() => {
            setFetchLoading(false)
          })
      }
    }
  }, [isPreview, initialData, query, queryParams])

  useEffect(() => {
    if (isPreview) {
      const [data] = liveResult
      console.log('LIVE_QUERY', data)
      // @ts-ignore
      window.LIVE_QUERY = data
    }
  }, [isPreview, liveResult])

  return isPreview ? liveResult : [fetchResult, fetchLoading, false]
}
