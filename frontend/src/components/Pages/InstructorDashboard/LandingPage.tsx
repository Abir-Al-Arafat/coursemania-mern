import React, { useState, useEffect } from 'react';

interface LandingPageProps {}

interface Photo {
  id: number;
  title: string;
  url: string;
}

const LandingPage: React.FC<LandingPageProps> = () => {
  const [title, setTitle] = useState<string>('');
  const [categories, setCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [description, setDescription] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const [photo, setPhoto] = useState<Photo | null>(null);

  useEffect(() => {
    // Fetching text data from JSONPlaceholder
    fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then((response) => response.json())
      .then((data) => setTitle(data.title))
      .catch((error) => console.error('Error fetching title:', error));

    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((response) => response.json())
      .then((data) => {
        const categoriesData: string[] = data.map((item: any) => item.title);
        setCategories(categoriesData);
      })
      .catch((error) => console.error('Error fetching categories:', error));

    fetch('https://jsonplaceholder.typicode.com/photos/1')
      .then((response) => response.json())
      .then((data) => {
        setTags([data.title]);
        setPhoto(data);
      })
      .catch((error) => console.error('Error fetching tags and image:', error));

    fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then((response) => response.json())
      .then((data) => setDescription(data.body))
      .catch((error) => console.error('Error fetching description:', error));
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <form className="max-w-2xl mx-auto">
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4 col-span-2">
            <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              className="border rounded w-full p-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-4 col-span-2">
            <label htmlFor="category" className="block text-gray-700 font-bold mb-2">
              Category
            </label>
            <select
              id="category"
              className="border rounded w-full p-2"
              value={categories[0]}
              onChange={(e) => setCategories([e.target.value])}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4 col-span-1">
            <label htmlFor="tags" className="block text-gray-700 font-bold mb-2">
              Tags
            </label>
            <div className="flex">
              <input
                type="text"
                id="tags"
                className="border rounded w-1/2 p-2 mr-2"
                value={tags[0]}
                onChange={(e) => setTags([e.target.value])}
              />
              <select
                className="border rounded w-1/2 p-2"
                value={tags[0]}
                onChange={(e) => setTags([e.target.value])}
              >
                {tags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mb-4 col-span-2">
            <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
              Description
            </label>
            <textarea
              id="description"
              className="border rounded w-full p-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-4 col-span-1">
            <label htmlFor="image" className="block text-gray-700 font-bold mb-2">
              Image
            </label>
            <div className="flex items-center">
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
                className="border rounded w-1/2 p-2 mr-2"
              />
              {photo && <img src={photo.url} alt={photo.title} className="w-1/2 h-auto" />}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LandingPage;
