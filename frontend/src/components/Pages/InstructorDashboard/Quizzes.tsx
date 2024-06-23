import React, { useState } from "react";

interface Option {
  id: number;
  text: string;
  isCorrect: boolean;
}

interface Question {
  id: number;
  text: string;
  options: Option[];
  marks: number;
}

const QuizComponent: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<string>("");
  const [options, setOptions] = useState<Option[]>([]);
  const [currentOption, setCurrentOption] = useState<string>("");
  const [marks, setMarks] = useState<number>(1);

  const handleAddQuestion = () => {
    if (currentQuestion.trim() === "" || options.length === 0 || marks <= 0) {
      // Don't add incomplete questions
      return;
    }

    const newQuestion: Question = {
      id: questions.length + 1,
      text: currentQuestion,
      options,
      marks,
    };

    setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
    setCurrentQuestion("");
    setOptions([]);
    setMarks(1);
  };

  const handleAddOption = () => {
    if (currentOption.trim() === "") {
      // Don't add empty options
      return;
    }

    const newOption: Option = {
      id: options.length + 1,
      text: currentOption,
      isCorrect: false,
    };

    setOptions((prevOptions) => [...prevOptions, newOption]);
    setCurrentOption("");
  };

  const handleMarkCorrect = (optionId: number) => {
    setOptions((prevOptions) =>
      prevOptions.map((option) =>
        option.id === optionId
          ? { ...option, isCorrect: !option.isCorrect }
          : option
      )
    );
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">Create Quiz</h2>
      <div className="mb-4">
        <label className="block text-lg font-bold mb-2" htmlFor="question">
          Add Question
        </label>
        <input
          type="text"
          id="question"
          value={currentQuestion}
          onChange={(e) => setCurrentQuestion(e.target.value)}
          className="border rounded w-full p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-lg font-bold mb-2" htmlFor="options">
          Add Options
        </label>
        <div className="flex">
          <input
            type="text"
            value={currentOption}
            onChange={(e) => setCurrentOption(e.target.value)}
            className="border rounded-l w-full p-2"
          />
          <button
            type="button"
            onClick={handleAddOption}
            className="bg-blue-500 text-white p-2 rounded-r"
          >
            Add
          </button>
        </div>
        {options.length > 0 && (
          <div className="mt-2">
            <strong>Options:</strong>
            <ul>
              {options.map((option) => (
                <li key={option.id}>
                  {option.text}{" "}
                  <input
                    type="checkbox"
                    checked={option.isCorrect}
                    onChange={() => handleMarkCorrect(option.id)}
                  />{" "}
                  Correct
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-lg font-bold mb-2" htmlFor="marks">
          Marks for Question
        </label>
        <input
          type="number"
          id="marks"
          value={marks}
          onChange={(e) => setMarks(Math.max(1, parseInt(e.target.value, 10)))}
          className="border rounded w-full p-2"
        />
      </div>
      <button
        type="button"
        onClick={handleAddQuestion}
        className="bg-green-500 text-white p-2 rounded"
      >
        Add Question
      </button>
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Quiz Preview</h3>
        {questions.map((question) => (
          <div key={question.id} className="mb-4">
            <p className="font-bold">{question.text}</p>
            <ul>
              {question.options.map((option) => (
                <li key={option.id}>
                  {option.text} {option.isCorrect && "(Correct)"}
                </li>
              ))}
            </ul>
            <p>Marks: {question.marks}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizComponent;
