import { FC } from "react";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  return (
    <div className="text-white w-full text-center py-2 border-b border-gray-700 text-2xl bg-gray-600/20">
      AI ChatBot
    </div>
  );
};

export default Navbar;
