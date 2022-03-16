import styles from '../styles/Home.module.css'
import Layout from '../components/layout'
import { ReactElement } from 'react'
import Plants from '../features/plants/plants'

const Home = () => {
  return (
    <div className={styles.container}>
      <Plants />
    </div>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Home
