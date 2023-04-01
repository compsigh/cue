import Image from 'next/image';
import Link from 'next/link';

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <ul>

        <li>
          <Link href='/'>
            <Image
              src="/icons/Cue.svg"
              alt="Cue"
              width={55}
              height={55}
            />
          </Link>
        </li>

        <li>
          <Link href='/review'>
            <Image
              src="/icons/Review.svg"
              alt="Review"
              width={55}
              height={55}
            />
          </Link>
        </li>

        <li>
          <Link href='/help'>
            <Image
              src="/icons/Help.svg"
              alt="Help"
              width={55}
              height={55}
            />
          </Link>
        </li>

        <li>
          <Link href='/feedback'>
            <Image
              src="/icons/Feedback.svg"
              alt="Feedback"
              width={55}
              height={55}
            />
          </Link>
        </li>

        <li>
          <Link href='/profile'>
            <Image
              src="/icons/Profile.svg"
              alt="Profile"
              width={55}
              height={55}
            />
          </Link>
        </li>

      </ul>
    </nav>
  );
};

export default Sidebar;
