import styles from '../../styles/Home.module.css'
import useSWR from 'swr'
import { useState, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { updateTypes } from './plantsSlice'
import Loader from '../../components/loader'
import { useRouter } from 'next/router'

const fetcher = async (
    input: RequestInfo,
    init: RequestInit,
    ...args: any[]
  ) => {
        const res = await fetch(input, init)
        return res.json()
    }

const Plants = () => {
    const { data, error } = useSWR('/api/powerplants', fetcher)
    const types = useAppSelector((state) => state.plants.types)
    const dispatch = useAppDispatch()
    const [isLoading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        setLoading(true)
        if (data) {
            dispatch(updateTypes(data.types))
            setLoading(false)
        }
    }, [data, error, dispatch])

    if (isLoading)
        return (
            <div className={styles.loader}>
                <Loader />
            </div>
        )
    if (!types.length) return <p>No data</p>

    return (
        <ul className={styles.list}>
            {types.map((value, idx) => (
            <li className={styles.listItem} key={`${value}-${idx}`} onClick={() => router.push(`/webmap?type=${value}`)}>
                {value}
            </li>
            ))}
        </ul>
    )
}

export default Plants
