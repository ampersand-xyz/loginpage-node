import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Auth from '@ampersand-xyz/loginpage'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Home() {

    var currentUser = null

    const onClickSignIn = e => {
        e.preventDefault()
        Auth.signIn()
            .then(() => {})
            .catch(e => console.log(e))
    }

    const containerStyle = 'min-h-screen px-0 py-2 flex flex-col justify-center items-center'
    const mainStyle = 'px-20 flex flex-col justify-center items-center'
    const titleStyle = 'text-8xl font-medium'
    const signInButtonStyle = 'px-8 py-4 m-8 text-lg text-white font-medium bg-blue-500 transition-all hover:bg-blue-400 focus:outline-none outline-none'

    return (
        <div className={containerStyle}>
            <Head>
                <title>LoginPage</title>
                <link rel="icon" href="/favicon.ico" />
                <meta property="og:title" content={'LoginPage'} key="ogtitle" />
                <meta property="og:description" content={'LoginPage demo'} key="ogdesc" />
            </Head>

            <main className={mainStyle}>
                <h1 className={titleStyle}>LoginPage</h1>
                {!currentUser && (
                    <button className={signInButtonStyle} onClick={onClickSignIn}>
                        Sign in
                    </button>
                )}
                {currentUser && (
                    <Link href='/profile'>
                        <a className={signInButtonStyle}>Go to dashboard</a>
                    </Link>
                )}
            </main>
        </div>
    )
}
