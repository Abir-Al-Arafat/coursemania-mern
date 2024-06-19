import React, { useEffect, useState } from "react";
import useCourses from "../../hooks/useCourses";

interface Card {
  id: number;
  title: string;
  description: string;
}

const CardComponent: React.FC<Card> = ({ id, title, description }) => (
  <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
    <img
      className="w-full h-48 object-cover"
      src={`https://picsum.photos/id/${id}/500/300`}
      alt={title}
    />
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2">{title}</div>
      <p className="text-gray-700 text-base">{description}</p>
    </div>
  </div>
);

const App: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const { courses, error, setCourses, setError } = useCourses();

  console.log("courses", courses);

  useEffect(() => {
    // Fetch data from your API
    // Replace the URL with your actual API endpoint
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => {
        const formattedData: Card[] = data.map((item: any) => ({
          id: item.id,
          title: item.title,
          description: item.body,
        }));
        setCards(formattedData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-6 p-4">
      {cards.map((card) => (
        <CardComponent key={card.id} {...card} />
      ))}
    </div>
  );
};

export default App;
