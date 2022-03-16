import styles from '../styles/WebMap.module.css'
import Layout from '../components/layout'
import { ReactElement, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { updateSelected } from '../features/plants/plantsSlice'

async function loadMap(container: HTMLDivElement, filter: string) {
    const { initialize } = await import('../data/mapping')
    return initialize(container, filter)
}

const WebMap = () => {
    const mapRef = useRef<HTMLDivElement>(null)
    const router = useRouter()
    const { type } = router.query
    const selected = useAppSelector((state) => state.plants.selected)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(updateSelected(type))
    }, [type, dispatch])

    useEffect(() => {
        let asyncCleanup: Promise<(() => void)>
        if (mapRef.current && selected) {
            asyncCleanup = loadMap(mapRef.current, selected)
        }
        return () => {
            asyncCleanup && asyncCleanup.then((cleanup) => cleanup())
        }
    }, [mapRef, selected])

    return (
        <div className={styles.container}>
            <div className={styles.viewDiv} ref={mapRef}></div>
        </div>
    )
}

WebMap.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default WebMap
