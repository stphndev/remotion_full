import Link from 'next/link'

const styles = {
  nav: {
    backgroundColor: '#333',
    padding: '10px',
  },
  navList: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    padding: 0,
    color: '#fff',
  },
  navItem: {
    marginRight: '10px',
    listStyle: 'none',
    fontSize: '24px',
  },
  navLink: {
    color: '#fff !important',
    textDecoration: 'none',
  },
}

const Header = () => {
  return (
    <nav style={styles.nav}>
      <ul style={styles.navList}>
        <li style={styles.navItem}>
          <Link style={styles.navLink} href='/'>
            Home
          </Link>
        </li>
        <li style={styles.navItem}>
          <Link style={styles.navLink} href='/video'>
            Video
          </Link>
        </li>
        <li style={styles.navItem}>
          <Link style={styles.navLink} href='/video2'>
            Video 2
          </Link>
        </li>
        <li style={styles.navItem}>
          <Link style={styles.navLink} href='/image'>
            Image
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Header
