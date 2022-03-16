import styles from '../styles/Home.module.css'
import Layout from '../components/layout'
import { ReactElement, useState, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { updateTypes } from '../features/plants/plantsSlice'
import Loader from '../components/loader'
import { useRouter } from 'next/router'

const Home = () => {
  const types = useAppSelector((state) => state.plants.types)
  const dispatch = useAppDispatch()
  const [isLoading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setLoading(true)
    fetch('api/powerplants')
      .then((res) => res.json())
      .then((data) => {
        dispatch(updateTypes(data.types))
        setLoading(false)
      })
  }, [dispatch])

  if (isLoading)
    return (
      <div className={styles.loader}>
        <Loader />
      </div>
    )
  if (!types.length) return <p>No profile data</p>
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {types.map((value, idx) => (
          <li className={styles.listItem} key={`${value}-${idx}`} onClick={() => router.push(`/webmap?type=${value}`)}>
            {value}
          </li>
        ))}
      </ul>
    </div>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Home
