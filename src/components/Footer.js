import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="footer" style={{position: 'absolute', bottom: 0, left: 0, right: 0}}>
      <nav>
        <ul style={{display: 'flex', listStyle: 'none', margin: 0, padding: 0}}>
          <li style={{marginRight: '1rem', fontSize: '0.8rem', marginBottom: '0.5rem'}}>
            <Link href='/' passHref>
              <span style={{color: '#000000'}}>Missions</span>
            </Link>
          </li>

          <li style={{marginRight: '1rem', fontSize: '0.8rem', marginBottom: '0.5rem'}}>
            <Link href='/' passHref>
              <span style={{color: '#000000'}}>Policies</span>
            </Link>
          </li>

          <li style={{marginRight: '1rem', fontSize: '0.8rem', marginBottom: '0.5rem'}}>
            <Link href='/' passHref>
              <span style={{color: '#000000'}}>Changes</span>
            </Link>
          </li>

          <li style={{marginRight: '1rem', fontSize: '0.8rem', marginBottom: '0.5rem'}}>
            <Link href='/profile' passHref>
              <span style={{color: '#000000'}}>Profile</span>
            </Link>
          </li>

          <li style={{marginRight: '1rem', fontSize: '0.8rem', marginBottom: '0.5rem'}}>
            <Link href='/help' passHref>
              <span style={{color: '#000000'}}>Help</span>
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;



