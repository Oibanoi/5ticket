import React from "react";
import HeaderAdmin from "./HeaderAdmin";
import NavbarAdmin from "./Navbar";

const LayoutAdmin = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <HeaderAdmin />
      <div className="flex h-[calc(100vh-80px)] font-sans">
        <div className="w-[200px]">
          <NavbarAdmin />
        </div>
        <div className="bg-white flex-1 w-[calc(100%-180px)]">
          <div className="bg-[#F9FAFB] rounded-tl-[50px] h-fit p-12 w-[98%] mr-auto ml-auto">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default LayoutAdmin;
