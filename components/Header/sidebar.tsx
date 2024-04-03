import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { BsFillChatLeftTextFill, BsThreeDotsVertical } from "react-icons/bs";

const Header: React.FC = () => {
  return (
    <div className="px-3 py-5 w-[32rem] bg-secondary border-r-gray-400">
      <div className="flex justify-between">
        <FaUserCircle />
        <div className="flex justify-around">
          <BsFillChatLeftTextFill />
          <BsThreeDotsVertical />
        </div>
      </div>
    </div>
  );
};

export default Header;
