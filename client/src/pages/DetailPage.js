import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {Loader} from '../components/Loader'
import {LinkCard} from '../components/LinkCard'

export const DetailPage = () => {
  const {token} = useContext(AuthContext)
  const {request, loading} = useHttp()
  const [link, setLink] = useState(null)
  //надо добавть id,так как в роутах мы сами так назвали
  const linkId = useParams().id

  const getLink = useCallback(async () => {
    try {
      const fetched = await request(`/api/link/${linkId}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setLink(fetched)
    } catch (e) {}
  }, [token, linkId, request])

  useEffect(() => {
    getLink()
  }, [getLink])

  if (loading) {
    return <Loader />
  }

  // если не хочу писать callback то могу getLink определить в useEffect и там же его вызвать, тоже будет работать


  // ниже возвращаем просто фрагмент
  return (
    <>
      { !loading && link && <LinkCard link={link} /> }
    </>
  )
}
