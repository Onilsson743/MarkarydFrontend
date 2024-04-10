import DisplayInfoCards from "@/components/DisplayInfoCards";
import Header from "@/components/Header";
import ImageUtilities from "@/components/ImageUtilities/ImageUtilities";


export default function Home() {
  const images : string[] = [
    "https://a0.muscache.com/im/pictures/miso/Hosting-686760093059295825/original/f16b8db3-c5b2-4e51-b1c9-fd25636a4309.jpeg?im_w=1920",
    "https://a0.muscache.com/im/pictures/miso/Hosting-686760093059295825/original/e2b784db-f1ba-4aef-a6fd-e1d033e9d568.jpeg?im_w=1920",

    "https://a0.muscache.com/im/pictures/miso/Hosting-686760093059295825/original/73e77552-7255-4031-af67-17f632928124.jpeg?im_w=1920",
    "https://a0.muscache.com/im/pictures/miso/Hosting-686760093059295825/original/846419e6-86d9-4bca-a4a8-f0456aaab531.jpeg?im_w=1920"
  ]



 
  return (
    <>
      <Header />
      {/* <DisplayInfoCards /> */}
      <ImageUtilities />
    </>
  );
}
