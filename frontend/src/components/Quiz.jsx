import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import he from 'he';
import ProfileMenu from './ProfileMenu';
const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const difficulty = query.get("difficulty") || "easy";
useEffect(() => {
  const fetchQuestions = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const res = await fetch(`https://opentdb.com/api.php?amount=10&difficulty=${difficulty}&type=multiple`);
      if (!res.ok) throw new Error(`Trivia API error: ${res.status}`);
      const data = await res.json();
      if (!data.results || data.results.length === 0) throw new Error("No questions received.");
      const formatted = data.results.map((q, idx) => {
        const options = [...q.incorrect_answers, q.correct_answer]
          .sort(() => Math.random() - 0.5);
        return {
          id: idx + 1,
          question: he.decode(q.question),
          correct: he.decode(q.correct_answer),
          options: options.map(opt => he.decode(opt))
        };
      });
      setQuestions(formatted);
    } catch (err) {
      console.error("Failed to load quiz questions:", err);
    } finally {
      setLoading(false);
    }
  };
  fetchQuestions();
}, [difficulty]);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login");
    }
  }, [navigate]);

  const handleSelect = (id, selected) => {
    setAnswers(prev => ({ ...prev, [id]: selected }));
  };

  const handleSubmit = () => {
    if (!questions.length) {
      alert("No quiz questions loaded.");
      return;
    }

    let correctCount = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correct) {
        correctCount++;
      }
    });
    setScore(correctCount);

    const token = localStorage.getItem("token"); 
 

    if (!token) {
      console.error("No user token found");
      return;
    }

    fetch("http://localhost:8090/api/scores/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        score: correctCount,
        difficulty
      })
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to save score");
        console.log(" Score saved successfully");
      })
      .catch(err => console.error(" Failed to save score:", err));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-gray-600">
        Loading questions...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <h1 className="text-4xl font-bold text-blue-800 mb-6">Trivia Quiz</h1>

      {score !== null ? (
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-3xl font-semibold text-green-600 mb-4">🎉 Quiz Completed!</h2>
          <p className="text-xl">Your Score: <strong>{score}</strong> / {questions.length}</p>
          <button
            onClick={() => navigate("/dashboard")}
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Back to Dashboard
          </button>
        </div>
      ) : (
        <>
          <ProfileMenu />
          <div className="w-full max-w-3xl space-y-6">
            {questions.map((q) => (
              <div key={q.id} className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-2">{q.id}. {q.question}</h2>
                <div className="space-y-2">
                  {q.options.map((opt, i) => (
                    <label key={i} className="block">
                      <input
                        type="radio"
                        name={`question-${q.id}`}
                        value={opt}
                        onChange={() => handleSelect(q.id, opt)}
                        checked={answers[q.id] === opt}
                        className="mr-2"
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleSubmit}
            className="mt-8 px-8 py-3 bg-green-600 text-white text-lg font-semibold rounded-md hover:bg-green-700 transition"
          >
            Submit Quiz
          </button>
        </>
      )}
    </div>
  );
};

export default Quiz;
