import React from 'react';

export interface CardProps {
  title: string;
  category: string;
  tags: string[];
  description: string;
  image: string; // Assuming image is a URL
}

const Card: React.FC<CardProps> = ({ title, category, tags, description, image }) => {
  return (
    <div className="bg-white p-4 mb-4 shadow-md rounded-md flex">
      <div className="w-1/4">
        <img src={image} alt={title} className="w-full h-auto" />
      </div>
      <div className="w-3/4 ml-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-500">{category}</p>
        <div className="flex mt-2">
          {tags.map((tag) => (
            <div key={tag} className="bg-gray-200 rounded p-1 mr-2">
              {tag}
            </div>
          ))}
        </div>
        <p className="mt-2">{description}</p>
      </div>
    </div>
  );
};

export default Card;
