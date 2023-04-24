import Link from 'next/link';

const Footer2 = () => {
  return (
    <footer className="footer2" style={{position: 'absolute', bottom: 0, left: 0, right: 0}}>
      <nav>
        <ul style={{display: 'flex', listStyle: 'none', margin: 0, padding: 0}}>
          <li style={{marginRight: '1rem', fontSize: '0.8rem', marginBottom: '0.5rem'}}>
            <p>
              <span style={{color: '#000000'}}>&copy;2023 compsigh</span>
            </p>
          </li>
          <li style={{marginRight: '1rem', fontSize: '0.8rem', marginBottom: '0.5rem'}}>
            <p>
              <span style={{color: '#000000'}}>Made with 🖤 in San Francisco</span>
            </p>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer2;



