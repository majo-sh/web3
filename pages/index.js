
import { useCallback, useEffect } from 'react'
import styles from '../styles/Home.module.css'
import { useWeb3React } from '@web3-react/core'
import { connector } from '../config/web3'


export default function Home() {
  const { activate, active, deactivate, account, error, chainId } = useWeb3React()

  const connect = useCallback(() => {
    activate(connector)
    localStorage.setItem('previuslyConnested', true)
  }, [activate])

  const disconnect = () => {
    deactivate()
    localStorage.removeItem('previuslyConnested')
  }
  if (error) {

    useEffect(() => {
      if (localStorage.getItem('previuslyConnested') === 'true')
        connect()
    }, [connect])

    return <p>algo ha ido mal </p>
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Web3 demo app whit Ethereum </h1>
      <div className={styles.center_container}>
        {
          active ? <>
            <button className={styles.button} onClick={disconnect}>disconnect</button>
            <div className={styles.center_container}>
              <p className={styles.text}> you are connected to {chainId} network. <br />
                you account is: {account}
              </p>
            </div>
          </>
            : <button className={styles.button} onClick={connect}>Connect Wallet</button>
        }
      </div>
    </div>
  )
}
