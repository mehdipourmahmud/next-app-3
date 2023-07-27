import Link from 'next/link';
import Image from 'next/image';


const ProfileMenu = ({session}) => {


  return (
    <div className="">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="flex items-center justify-center">
          <Image
            className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
            src={session?.user?.image}
            alt="Avatar"
            width={150}
            height={150}
          />
        </div>
        <p className="text-xl text-center mt-4">{session?.user?.name}</p>
 
      </div>

    </div>
  );
};

export default ProfileMenu;
