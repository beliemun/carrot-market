import { getDeliveryUrl } from "@libs/client/utils";
import Image from "next/image";
import Link from "next/link";

interface IProfileSection {
  className?: string;
  name: string;
  avatar: string | null;
  title: string;
  url: string;
  [key: string]: any;
}

const ProfileSection = ({ className, name, avatar, title, url, rest }: IProfileSection) => {
  return (
    <div className={className} {...rest}>
      <div className="flex flex-row items-center w-full py-3 cursor-pointer">
        {avatar ? (
          <Image
            alt="Avatar"
            className="w-14 h-14 bg-gray-200 rounded-full mr-4"
            width={56}
            height={56}
            placeholder="blur"
            blurDataURL={getDeliveryUrl(avatar, "thumbnail")}
            src={getDeliveryUrl(avatar, "avatar")}
          />
        ) : (
          <div className="w-14 h-14 bg-gray-200 rounded-full mr-4" />
        )}
        <div>
          <p className="font-medium">{name}</p>
          <Link href={url}>
            <p className="text-sm font-medium text-gray-400">{title} &rarr;</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
