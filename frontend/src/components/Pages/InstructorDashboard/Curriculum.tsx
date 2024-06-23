import React, { useState } from 'react';

interface Section {
  id: number;
  title: string;
  lessons: Lesson[];
  isEditing: boolean;
}

interface Lesson {
  id: number;
  title: string;
  videoFile: File | null;
  pdfFile: File | null;
  isEditing: boolean;
}

const CurriculumPage: React.FC = () => {
  const [sections, setSections] = useState<Section[]>([
    {
      id: 1,
      title: 'Section 1: Getting Started',
      lessons: [
        { id: 1, title: 'Introduction to the Course', videoFile: null, pdfFile: null, isEditing: false },
        { id: 2, title: 'Setting Up Your Environment', videoFile: null, pdfFile: null, isEditing: false },
      ],
      isEditing: false,
    },
    // Add more sections as needed
  ]);

  const toggleAccordion = (sectionId: number) => {
    setSections((prevSections) =>
      prevSections.map((section) => ({
        ...section,
        isEditing: false,
        lessons: section.id === sectionId ? section.lessons.map(lesson => ({ ...lesson, isEditing: false })) : section.lessons,
      }))
    );
  };

  const addSection = () => {
    const newSection: Section = {
      id: sections.length + 1,
      title: `Section ${sections.length + 1}: New Section`,
      lessons: [],
      isEditing: false,
    };
    setSections([...sections, newSection]);
  };

  const removeSection = (sectionId: number) => {
    const updatedSections = sections.filter((section) => section.id !== sectionId);
    setSections(updatedSections);
  };

  const editSection = (sectionId: number) => {
    setSections((prevSections) =>
      prevSections.map((section) => ({
        ...section,
        isEditing: section.id === sectionId ? !section.isEditing : false,
      }))
    );
  };

  const updateSection = (sectionId: number, newTitle: string) => {
    setSections((prevSections) =>
      prevSections.map((section) => ({
        ...section,
        title: section.id === sectionId ? newTitle : section.title,
        isEditing: false,
      }))
    );
  };

  const addLesson = (sectionId: number) => {
    const sectionIndex = sections.findIndex((section) => section.id === sectionId);
    if (sectionIndex !== -1) {
      const newLesson: Lesson = {
        id: sections[sectionIndex].lessons.length + 1,
        title: `Lesson ${sections[sectionIndex].lessons.length + 1}: New Lesson`,
        videoFile: null,
        pdfFile: null,
        isEditing: false,
      };
      const updatedSections = [...sections];
      updatedSections[sectionIndex].lessons.push(newLesson);
      setSections(updatedSections);
    }
  };

  const removeLesson = (sectionId: number, lessonId: number) => {
    const sectionIndex = sections.findIndex((section) => section.id === sectionId);
    if (sectionIndex !== -1) {
      const updatedSections = [...sections];
      updatedSections[sectionIndex].lessons = updatedSections[sectionIndex].lessons.filter(
        (lesson) => lesson.id !== lessonId
      );
      setSections(updatedSections);
    }
  };

  const editLesson = (sectionId: number, lessonId: number) => {
    setSections((prevSections) =>
      prevSections.map((section) => ({
        ...section,
        lessons: section.id === sectionId ? section.lessons.map((lesson) => ({
          ...lesson,
          isEditing: lesson.id === lessonId ? !lesson.isEditing : false,
        })) : section.lessons,
      }))
    );
  };

  const updateLesson = (sectionId: number, lessonId: number, newTitle: string) => {
    setSections((prevSections) =>
      prevSections.map((section) => ({
        ...section,
        lessons: section.id === sectionId ? section.lessons.map((lesson) => ({
          ...lesson,
          title: lesson.id === lessonId ? newTitle : lesson.title,
          isEditing: false,
        })) : section.lessons,
      }))
    );
  };

  const handleFileChange = (
    sectionId: number,
    lessonId: number,
    fileType: 'video' | 'pdf',
    file: File | null
  ) => {
    setSections((prevSections) =>
      prevSections.map((section) => ({
        ...section,
        lessons: section.id === sectionId
          ? section.lessons.map((lesson) => ({
            ...lesson,
            [`${fileType}File`]: lesson.id === lessonId ? (file as File) : lesson[`${fileType}File`],
          }))
          : section.lessons,
      }))
    );
  };
  

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">Curriculum</h2>

      {/* Accordion */}
      <div className="space-y-4">
        {sections.map((section) => (
          <div key={section.id}>
            {/* Section Header */}
            <div className="flex justify-between items-center">
              <h3
                onClick={() => toggleAccordion(section.id)}
                className="text-lg font-semibold cursor-pointer"
              >
                {section.title}
              </h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => editSection(section.id)}
                  className="text-blue-500 hover:underline"
                >
                  Edit Section
                </button>
                <button
                  onClick={() => removeSection(section.id)}
                  className="text-red-500 hover:underline"
                >
                  Remove Section
                </button>
              </div>
            </div>

            {/* Section Content (Collapsible) */}
            {section.isEditing ? (
              <div className="ml-6">
                <input
                  type="text"
                  value={section.title}
                  onChange={(e) => updateSection(section.id, e.target.value)}
                  className="border rounded p-1 mr-2"
                />
                <button
                  onClick={() => updateSection(section.id, section.title)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Update
                </button>
                <button
                  onClick={() => toggleAccordion(section.id)}
                  className="bg-gray-500 text-white px-3 py-1 rounded ml-2"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className={`ml-6 ${section.isEditing ? 'hidden' : 'block'}`}>
                <ul className="list-disc">
                  {section.lessons.map((lesson) => (
                    <li
                      key={lesson.id}
                      className="text-gray-700 flex justify-between items-center"
                    >
                      <span>{lesson.title}</span>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => editLesson(section.id, lesson.id)}
                          className="text-blue-500 hover:underline"
                        >
                          Edit Lesson
                        </button>
                        <button
                          onClick={() => removeLesson(section.id, lesson.id)}
                          className="text-red-500 hover:underline"
                        >
                          Remove Lesson
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => addLesson(section.id)}
                  className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Add Lesson
                </button>
              </div>
            )}

            {/* Edit Lesson Form */}
            {section.lessons.map((lesson) => (
              <div key={lesson.id} className={`ml-8 ${lesson.isEditing ? 'block' : 'hidden'}`}>
                <input
                  type="text"
                  value={lesson.title}
                  onChange={(e) => updateLesson(section.id, lesson.id, e.target.value)}
                  className="border rounded p-1 mr-2"
                />
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => handleFileChange(section.id, lesson.id, 'video', e.target.files?.[0] || null)}
                  className="border rounded p-1 mr-2"
                />
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => handleFileChange(section.id, lesson.id, 'pdf', e.target.files?.[0] || null)}
                  className="border rounded p-1 mr-2"
                />
                <button
                  onClick={() => updateLesson(section.id, lesson.id, lesson.title)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Update
                </button>
                <button
                  onClick={() => editLesson(section.id, lesson.id)}
                  className="bg-gray-500 text-white px-3 py-1 rounded ml-2"
                >
                  Cancel
                </button>
              </div>
            ))}
          </div>
        ))}

        {/* Add Section Button */}
        <button onClick={addSection} className="bg-green-500 text-white px-4 py-2 rounded">
          Add Section
        </button>
      </div>
    </div>
  );
};

export default CurriculumPage;
