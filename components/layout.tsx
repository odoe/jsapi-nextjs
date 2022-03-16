import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAppSelector } from '../app/hooks'
import { useEffect, useState } from 'react'
import styles from './layout.module.css'

export default function Layout({ children }: any) {
    const router = useRouter()
    const selected = useAppSelector((state) => state.plants.selected)
    const [showPrevious, setShowPrevious] = useState(false)
    useEffect(() => {
        setShowPrevious(router.asPath.includes('/webmap'))
    }, [router])
    return (
        <>
            <Head>
                <title>Power Plants Explorer</title>
            </Head>
            <div className={styles.layout}>
                <header className={styles.header}>
                    {
                        showPrevious ?
                        <Link href="/">
                            <a>
                                <svg className={styles.link} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M14 5.25L3.25 16 14 26.75V20h14v-8H14zM27 13v6H13v5.336L4.664 16 13 7.664V13z"/><path fill="none" d="M0 0h32v32H0z"/></svg>
                            </a>
                        </Link>
                        : null
                    }
                    <div className={styles.container}>
                        <h3>Global Power Plants</h3>
                        {showPrevious  && selected ? <small className={styles.small}>({selected})</small> : null}
                    </div>
                </header>
                <main className={styles.main}>{children}</main>
            </div>
        </>
    )
}