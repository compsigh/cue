import Image from 'next/image';
import Link from 'next/link';

const Sidebar = () => {
  return (
    <div className="sidebar">

      <Link href='/'>
        <Image
          src="/icons/cue.svg"
          alt="Cue"
          width={55}
          height={55}
        />
      </Link>

      <Link href='/review'>
        <Image
          src="/icons/Review.svg"
          alt="Review"
          width={55}
          height={55}
        />
      </Link>

      <Link href='/help'>
        <Image
          src="/icons/Help.svg"
          alt="Help"
          width={55}
          height={55}
        />
      </Link>

      <Link href='/feedback'>
        <Image
          src="/icons/Feedback.svg"
          alt="Feedback"
          width={55}
          height={55}
        />
      </Link>

      <Link href='/profile'>
        <Image
          src="/icons/Profile.svg"
          alt="Profile"
          width={55}
          height={55}
        />
      </Link>

    </div>
  );
};

export default Sidebar;
