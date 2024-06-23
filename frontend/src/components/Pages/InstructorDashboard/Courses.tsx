import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Button, Modal, TextInput, Label, Checkbox } from "flowbite-react";
import Card, { CardProps } from "./Card";
import CourseDetailsPage from "./CourseDetailsPage";

// Mock API endpoint for fetching category and tag options
const API_ENDPOINT = "https://jsonplaceholder.typicode.com";

interface CoursesProps {}

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const CustomModal: React.FC<ModalProps> = ({ onClose, children }) => {
  return (
    <Modal className="bg-primary" show={true} size="md" onClose={onClose} popup>
      <Modal.Header />
      <Modal.Body style={{ color: "black" }}>{children}</Modal.Body>
    </Modal>
  );
};

const Courses: React.FC<CoursesProps> = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [categoryOptions, setCategoryOptions] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [tagOptions, setTagOptions] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [cards, setCards] = useState<CardProps[]>([]);

  useEffect(() => {
    // Fetch category options from the API
    fetch(`${API_ENDPOINT}/todos`)
      .then((response) => response.json())
      .then((data) => {
        // Extract unique categories from the response
        const categories = [...new Set(data.map((item: any) => item.title))];
        setCategoryOptions(categories as string[]);
      })
      .catch((error) => console.error("Error fetching categories:", error));

    // Fetch tag options from the API
    fetch(`${API_ENDPOINT}/photos`)
      .then((response) => response.json())
      .then((data) => {
        // Extract unique tags from the response
        const tags = [...new Set(data.map((item: any) => item.title))];
        setTagOptions(tags as string[]);
      })
      .catch((error) => console.error("Error fetching tags:", error));
  }, []);

  const handleAddTag = (tag: string) => {
    setSelectedTags((prevTags) => [...prevTags, tag]);
  };

  const handleRemoveTag = (tag: string) => {
    setSelectedTags((prevTags) => prevTags.filter((t) => t !== tag));
  };

  const handleSubmit = () => {
    // Create card component with the entered details and add it to the main part of the page
    // For now, we'll just log the details
    console.log({
      title,
      category: selectedCategory,
      tags: selectedTags,
      description,
      image,
    });

    const cardData: CardProps = {
      title,
      category: selectedCategory,
      tags: selectedTags,
      description,
      // image: URL.createObjectURL(image), // Assuming image is a File
      image: "image",
    };

    // Log the card data
    console.log(cardData);

    // Render the card on the main part of the dashboard
    setCards((prevCards) => [...prevCards, cardData]);

    // Reset the form fields
    setTitle("");
    setSelectedCategory("");
    setSelectedTags([]);
    setDescription("");
    setImage(null);

    // Close the modal
    setShowModal(false);
  };

  const handleCancel = () => {
    // Reset the form fields
    setTitle("");
    setSelectedCategory("");
    setSelectedTags([]);
    setDescription("");
    setImage(null);

    // Close the modal
    setShowModal(false);
  };

  const handleEditClick = () => {
    // Handle the edit click, you can redirect to the details page or open another modal
    console.log("Edit clicked");
    <NavLink to={`/instructor/dashboard/courses/details`}>
      {" "}
      <CourseDetailsPage />{" "}
    </NavLink>;
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Courses</h2>
      <Button
        onClick={() => setShowModal(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Course
      </Button>

      {/* Modal */}
      {showModal && (
        <CustomModal onClose={handleCancel}>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Add Course
            </h3>

            <div>
              <label className="text-black" htmlFor="title">
                Title
              </label>
              <input
                id="title"
                placeholder="Enter title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                required
                className="border rounded w-full p-2"
              />
            </div>

            <div>
              <label className="text-black" htmlFor="category">
                Category
              </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border rounded w-full p-2"
              >
                <option value="">Select Category</option>
                {categoryOptions.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="tags">Tags</label>
              <div className="flex items-center flex-col">
                <select
                  id="tags"
                  onChange={(e) => handleAddTag(e.target.value)}
                  className="border rounded w-full p-2"
                >
                  <option value="">Select Tag</option>
                  {tagOptions.map((tag) => (
                    <option key={tag} value={tag}>
                      {tag}
                    </option>
                  ))}
                </select>
                <div className="ml-2">
                  {selectedTags.map((tag) => (
                    <div
                      key={tag}
                      className="flex items-center justify-between bg-gray-200 rounded p-1"
                    >
                      <span className="mr-1">{tag}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="text-red-500"
                      >
                        &#10005;
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                placeholder="Enter description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                className="border rounded w-full p-2"
              />
            </div>

            <div>
              <label htmlFor="image">Image</label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
                className="border rounded w-full p-2"
              />
            </div>

            <div className="flex justify-end">
              <Button
                onClick={handleSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              >
                Submit
              </Button>
              <Button
                onClick={handleCancel}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </Button>
            </div>
          </div>
        </CustomModal>
      )}

      {/* Main part of the dashboard */}
      <NavLink to={`/instructor/dashboard/courses/details`}>
        <div className="mt-3">
          {cards.map((card, index) => (
            <CardWithEditOverlay
              key={index}
              {...card}
              onEditClick={handleEditClick}
            />
          ))}
        </div>
      </NavLink>
    </div>
  );
};

interface CardWithEditOverlayProps extends CardProps {
  onEditClick: () => void;
}

const CardWithEditOverlay: React.FC<CardWithEditOverlayProps> = ({
  onEditClick,
  ...cardProps
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card {...cardProps} />

      {isHovered && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <button
            className="text-white p-2 bg-blue-500 rounded"
            onClick={onEditClick}
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default Courses;
