// CourseDetails.tsx

import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import LearnerLayout from "../../Templates/LearnerLayout";

interface Course {
  id: number;
  title: string;
  body: string;
}

interface Section {
  id: number;
  title: string;
  content: string;
  subsections: Subsection[];
}

interface Subsection {
  id: number;
  title: string;
  content: string;
  videoUrl: string;
}

const CourseDetails: React.FC= () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const [selectedSubsection, setSelectedSubsection] =
    useState<Subsection | null>(null);

  useEffect(() => {
    // Fetch data from a mock API (replace with your API endpoint)
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => {
        // Sample data formatting, replace with your actual data structure
        const formattedData: Section[] = data.map((item: any) => ({
          id: item.id,
          title: item.title,
          content: item.body,
          subsections: Array.from({ length: 3 }, (_, index) => ({
            id: index + 1,
            title: `Subsection ${index + 1}`,
            content: `Content for Subsection ${index + 1}`,
            // videoUrl: "https://www.example.com/sample-video.mp4", // Replace with your video URL
            videoUrl: "https://www.youtube.com/watch?v=K4TOrB7at0Y", // Replace with your video URL
          })),
        }));
        setSections(formattedData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleSectionClick = (section: Section) => {
    setSelectedSection(section);
    setSelectedSubsection(null);
  };

  const handleSubsectionClick = (subsection: Subsection) => {
    setSelectedSubsection(subsection);
  };

  return (
    <LearnerLayout>
      <div className="flex">
        {/* Accordion on the right side */}
        {/* <h1>123</h1> */}
        <div className="w-1/4">
          <h2 className="text-lg font-semibold mb-4">Sections</h2>
          <div className="overflow-y-scroll flex flex-col h-5/6">
            {sections.map((section) => (
              <div key={section.id} className="mb-2">
                <div
                  className="cursor-pointer text-blue-500 hover:underline"
                  onClick={() => handleSectionClick(section)}
                >
                  {section.title}
                </div>
                {selectedSection?.id === section.id && (
                  <div className="ml-4">
                    {section.subsections.map((subsection) => (
                      <div
                        key={subsection.id}
                        className="cursor-pointer text-gray-500 hover:underline"
                        onClick={() => handleSubsectionClick(subsection)}
                      >
                        {subsection.title}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content on the left side */}
        <div className="w-3/4">
          <button
            className="text-blue-500 underline mb-4 cursor-pointer"
          >
            Back
          </button>
          <div>
            <h2 className="text-xl font-semibold mb-4">
              {selectedSection?.title || "Select a Section"}
            </h2>
            <p>{selectedSection?.content}</p>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">
              {selectedSubsection?.title || "Select a Subsection"}
            </h3>
            <p>{selectedSubsection?.content}</p>
            {selectedSubsection?.videoUrl && (
              <ReactPlayer
                url={`http://127.0.0.1:8000/api/subchapters/video/:id`}
                controls
                width="100%"
              />
            )}
            {/* {selectedSubsection?.videoUrl && (
              <video width="70%" id="videoPlayer" controls>
                <source src="http://127.0.0.1:8000/api/subchapters/video/:id" type="video/mp4"/>
              </video>
              // <video id="videoPlayer" width="70%" controls>
              //   <source src="http://127.0.0.1:8000/api/subchapters/video/:id" type="video/mp4"  />
              //   <source src={`${import.meta.env.VITE_BACKEND}/api/subchapters/video`} type="video/mp4"  />
              // </video>
            )} */}
          </div>
        </div>
      </div>
    </LearnerLayout>
  );
};

export default CourseDetails;
