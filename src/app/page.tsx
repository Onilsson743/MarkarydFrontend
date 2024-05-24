import DisplayInfoCards from "@/components/DisplayInfoCards";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import ImageGrid from "@/components/ImageGrid/ImageGrid";
import ImageUtilities from "@/components/ImageUtilities/ImageUtilities";
import Navbar from "@/components/Navbar/Navbar";


export default function Home() {
 
  return (
    <>
     <Navbar />
      <Header />
      {/* <DisplayInfoCards /> */}
      {/* <ImageUtilities /> */}
      <ImageGrid />
      <Footer/>
    </>
  );
}
