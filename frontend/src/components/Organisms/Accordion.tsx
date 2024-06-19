import React, { useState } from "react";

interface AccordionItem {
  title: string;
  contents: React.ReactNode[];
}

interface AccordionProps {
  items: AccordionItem[];
}

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="w-11/12 mx-auto">
      {items.map((item, index) => (
        <div
          key={index}
          className={`mb-4 border rounded shadow bg-gray-800 text-white transition duration-300 ${
            activeIndex === index ? "overflow-visible" : "overflow-hidden"
          }`}
        >
          <div
            className="flex items-center justify-between p-4 cursor-pointer"
            onClick={() => toggleAccordion(index)}
          >
            <h2 className="text-lg font-semibold">{item.title}</h2>
            <svg
              className={`w-5 h-5 transition-transform ${
                activeIndex === index ? "transform rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </div>
          {activeIndex === index && (
            <div className="p-4">
              {item.contents.map((content, contentIndex) => (
                <div key={contentIndex} className="mb-2">
                  {content}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// Example usage
const App: React.FC = () => {
  const accordionItems: AccordionItem[] = [
    {
      title: "Section 1",
      contents: [
        <p key={1}>Content 1-1</p>,
        <p key={2}>Content 1-2</p>,
        <p key={1}>Content 1-1</p>,
        <p key={2}>Content 1-2</p>,
      ],
    },
    {
      title: "Section 2",
      contents: [
        <p key={3}>Content 2-1</p>,
        <p key={4}>Content 2-2</p>,
        <p key={4}>Content 2-2</p>,
      ],
    },
    {
      title: "Section 3",
      contents: [<p key={5}>Content 3-1</p>],
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <Accordion items={accordionItems} />
    </div>
  );
};

export default App;
