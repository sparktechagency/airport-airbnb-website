import React from 'react';
import { FaLink, FaPhoneAlt } from 'react-icons/fa';

type Item = {
  name: string;
  phone: string;
  website: string;
};

type SingleCardProps = {
  items: Item;
};

const SingleCard: React.FC<SingleCardProps> = ({ items }) => {
    return (
        <div className=" border border-[#EEEEEE] rounded-lg p-5 shadow bg-white">
      <h2 className="text-[16px] font-semibold text-[#333333] pb-1">{items?.name}</h2>

      <div className="flex items-center mt-2 text-gray-600 text-sm pb-1">
        <FaPhoneAlt className="h-3 w-3 mr-2 text-gray-500" />
        <span>{items?.phone}</span>
      </div>

      <div className="flex items-center mt-1 text-blue-600 text-sm">
        <FaLink className="h-3 w-3 mr-2 text-blue-500" />
        <a
          href={items?.website}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
         {items?.website}
        </a>
      </div>
    </div>
    );
};

export default SingleCard;