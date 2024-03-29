import { Layout, ProfileSection } from "@components/shared";
import { useMutation, useUser } from "@libs/client";
import { getDeliveryUrl } from "@libs/client/utils";
import { Review, User } from "@prisma/client";
import { ResponseType } from "@shared/types";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

interface ReviewWithUser extends Review {
  createdBy: User;
}

interface ReviewResult extends ResponseType {
  reviews: ReviewWithUser[];
}

const Profile: NextPage = () => {
  const { user } = useUser();
  const router = useRouter();
  const { data: reviewData } = useSWR<ReviewResult>(`/api/reviews`);
  const [mutate, { data: logoutData }] = useMutation<ResponseType>("api/users/logout");
  const handleLogout = () => mutate({});
  useEffect(() => {
    if (logoutData?.ok) {
      router.replace("/enter");
    }
  }, [logoutData]);
  return (
    <Layout title="프로필" hasTabBar={true}>
      <div>
        {user ? (
          <ProfileSection
            className={`px-4`}
            name={user.name}
            avatar={user.avatar}
            title={"Edit Profile"}
            url={"/profile/edit"}
          />
        ) : null}
        <div className="flex justify-around py-2">
          <div className="col-center  my-4">
            <Link
              href={"/profile/sale"}
              className="w-14 h-14 col-center bg-orange-400 rounded-full text-white"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                ></path>
              </svg>
            </Link>
            <span className="text-sm mt-2">판매 내역</span>
          </div>
          <Link href={"/profile/purchase"} className="col-center  my-4">
            <div className="w-14 h-14 col-center bg-orange-400 rounded-full text-white">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                ></path>
              </svg>
            </div>
            <span className="text-sm mt-2">구매 내역</span>
          </Link>
          <Link href={"/profile/favorite"} className="col-center  my-4">
            <div className="w-14 h-14 col-center bg-orange-400 rounded-full text-white">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                ></path>
              </svg>
            </div>
            <span className="text-sm mt-2">관심 목록</span>
          </Link>
        </div>
        {reviewData?.reviews.map((review, index) => (
          <div className="px-4" key={index}>
            <div className="flex flex-row space-x-2 my-2">
              <div className="w-6 h-6 bg-gray-200 rounded-full" />
              <div className="flex items-center ">
                <h4 className="">{review.createdBy.name}</h4>
                <div className="flex flex-row">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      className={`${review.score > index ? "text-yellow-400" : "text-gray-400"} h-5 w-5`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <p>{review.text}</p>
            </div>
          </div>
        ))}

        <h3 className="text-red-400 text-center cursor-pointer py-2" onClick={handleLogout}>
          Logout
        </h3>
      </div>
    </Layout>
  );
};
export default Profile;
