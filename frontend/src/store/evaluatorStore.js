import { toast } from "react-hot-toast"; // Import toast
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useEvaluatorStore = create((set, get) => ({
  selectedQuestion: "Q1a",
  selectedButton: "Q1a",
  examType: "MSE",

  questions: {
    Q1a: { marks: 0, maxMarks: 5 },
    Q1b: { marks: 0, maxMarks: 5 },
    Q2a: { marks: 0, maxMarks: 5 },
    Q2b: { marks: 0, maxMarks: 5 },
    Q3a: { marks: 0, maxMarks: 5 },
    Q3b: { marks: 0, maxMarks: 5 },
  },

  totalMarks: 0, // Add totalMarks to the state
  optionalQuestions: [], // Add optionalQuestions to the state

  setExamType: (type) =>
    set((state) => ({
      examType: type,
      questions:
        type === "MSE"
          ? {
              Q1a: { marks: 0, maxMarks: 5 },
              Q1b: { marks: 0, maxMarks: 5 },
              Q2a: { marks: 0, maxMarks: 5 },
              Q2b: { marks: 0, maxMarks: 5 },
              Q3a: { marks: 0, maxMarks: 5 },
              Q3b: { marks: 0, maxMarks: 5 },
            }
          : {
              Q1a: { marks: 0, maxMarks: 10 },
              Q1b: { marks: 0, maxMarks: 10 },
              Q2a: { marks: 0, maxMarks: 10 },
              Q2b: { marks: 0, maxMarks: 10 },
              Q3a: { marks: 0, maxMarks: 10 },
              Q3b: { marks: 0, maxMarks: 10 },
              Q4a: { marks: 0, maxMarks: 10 },
              Q4b: { marks: 0, maxMarks: 10 },
              Q5a: { marks: 0, maxMarks: 10 },
              Q5b: { marks: 0, maxMarks: 10 },
            },
      totalMarks: 0, // Reset totalMarks when exam type changes
      optionalQuestions: [], // Reset optionalQuestions when exam type changes
    })),

  setSelectedQuestion: (question) =>
    set(
      { selectedQuestion: question },
      console.log("Selected Question updated to", { question })
    ),

  setSelectedButton: (button) => set({ selectedButton: button }),

  updateMarks: (question, marks) =>
    set((state) => {
      console.log(question);
      const currentMarks = parseFloat(state.questions[question].marks) || 0;
      const newMarks = parseFloat(marks) || 0;
      const maxMarks = state.questions[question].maxMarks;
      console.log(question);

      // Calculate the updated marks for the question
      const updatedMarks = currentMarks + newMarks;

      if (updatedMarks > maxMarks) {
        // Display toast notification if the marks exceed the limit
        toast.error(
          `Max marks for ${question} is ${maxMarks}. You cannot exceed this limit.`,
          {
            position: "bottom-center",
          }
        );
        return state; // Do not update marks
      }

      // Update the marks if within limits
      const updatedQuestions = {
        ...state.questions,
        [question]: { marks: updatedMarks, maxMarks },
      };

      // Calculate the total marks based on the exam type
      const { totalMarks, optionalQuestions } = calculateTotalMarks(
        updatedQuestions,
        state.examType
      );

      return {
        ...state,
        questions: updatedQuestions,
        totalMarks,
        optionalQuestions,
      };
    }),
}));

// Helper function to calculate total marks based on exam type
const calculateTotalMarks = (questions, examType) => {
  const questionGroups = {};

  // Group questions by their base name (e.g., Q1, Q2)
  Object.keys(questions).forEach((key) => {
    const baseName = key.slice(0, -1); // Remove the last character (a or b)
    if (!questionGroups[baseName]) {
      questionGroups[baseName] = 0;
    }
    questionGroups[baseName] += questions[key].marks;
  });

  // Convert the question groups to an array of { name, totalMarks }
  const questionArray = Object.keys(questionGroups).map((key) => ({
    name: key,
    totalMarks: questionGroups[key],
  }));

  // Sort the array by totalMarks in descending order
  questionArray.sort((a, b) => b.totalMarks - a.totalMarks);

  let selectedQuestions = [];
  let optionalQuestions = [];

  if (examType === "MSE") {
    // For MSE, select the highest two totals
    selectedQuestions = questionArray.slice(0, 2);
    optionalQuestions = questionArray.slice(2);
  } else if (examType === "ESE") {
    // For ESE, select the highest three totals
    selectedQuestions = questionArray.slice(0, 3);
    optionalQuestions = questionArray.slice(3);
  }

  // Calculate the total marks from the selected questions
  const totalMarks = selectedQuestions.reduce(
    (acc, q) => acc + q.totalMarks,
    0
  );

  // Return the total marks and the optional questions
  return {
    totalMarks,
    optionalQuestions: optionalQuestions.map((q) => q.name),
  };
};
