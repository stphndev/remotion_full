import Link from 'next/link';

const Header = () => {
  return (
    <nav style={styles.nav}>
      <ul style={styles.navList}>
        <li style={styles.navItem}>
          <Link href="/">
            Home
          </Link>
        </li>
        <li style={styles.navItem}>
          <Link href="/video">
            Video
          </Link>
        </li>
        <li style={styles.navItem}>
          <Link href="/Image">
            Image
          </Link>
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  nav: {
    backgroundColor: '#333',
    padding: '10px',
  },
  navList: {
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
  },
  navItem: {
    marginRight: '10px',
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
  },
};

export default Header;
