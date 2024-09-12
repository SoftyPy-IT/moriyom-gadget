import { PropsWithChildren } from "react";
import Container from "@/components/common/Container";
import { Metadata } from "next";
import { getGlobalData } from "@/utils/getGlobalData";

const ProfileLayout = ({ children }: PropsWithChildren) => {
  return (
    <Container>
      <div className="mx-auto my-8 w-full bg-[#f9fafb] rounded-lg">
        <div className="mx-auto w-full pt-6 lg:px-8">
          {/* Main content */}
          <main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>
        </div>
      </div>
    </Container>
  );
};

export default ProfileLayout;

export async function generateMetadata(): Promise<Metadata> {
  const data = await getGlobalData();
  return {
    title: data?.shopName + " | Profile",
    description: data?.description || "",
    openGraph: {
      images: [
        {
          url: data?.logo || "",
          alt: data?.shopName || "",
        },
      ],
    },
  };
}
