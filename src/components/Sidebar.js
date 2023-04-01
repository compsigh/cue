import Image from 'next/image';

const Sidebar = () => {
  return (
    <div className="sidebar">
         <div>
      <button>
        <Image
          src="/favicon.ico"
          alt="Fav Icon"
          width={30}
          height={30}
        />
      </button>
      </div>
      <div>
      <button>
        <Image
          src="/icons/Help.svg"
          alt="Help Icon"
          width={30}
          height={30}
        />
      </button>
      </div>
      <div>

      <button>
        <Image
          src="/icons/Feedback.svg"
          alt="Feedback Icon"
          width={30}
          height={30}
        />
      </button>
      </div>
      <div>
      <button>
        <Image
          src="/icons/Profile.svg"
          alt="Profile Icon"
          width={30}
          height={30}
        />
      </button>
      </div>
      <div>
      <button>
        <Image
          src="/icons/Review.svg"
          alt="Review Icon"
          width={30}
          height={30}
        />
      </button>
      </div>
    </div>
  );
};

export default Sidebar;
