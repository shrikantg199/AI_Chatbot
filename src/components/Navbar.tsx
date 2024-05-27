import { FC } from "react";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  return (
    <div className="text-white w-full text-center py-3 border-b border-gray-700 text-2xl bg-black/60">
      AI ChatBot
    </div>
  );
};

export default Navbar;
