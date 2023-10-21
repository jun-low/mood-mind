'use client';

import { askQuestion } from '@/utils/api';
import { FormEvent, useState } from 'react'

const QuestionSearch = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const {data} = await askQuestion(question);

    setAnswer(data);
    setLoading(false);
    setQuestion('');
  };
  return (
    <div>
      <form onSubmit={ handleSubmit }>
        <input
          type="text"
          name="question"
          value={ question }
          onChange={ (e) => setQuestion(e.target.value) }
          className="border border-gray-300 rounded p-2 mr-2 outline-none w-[calc(100%-70px)]"
          disabled={ loading }
          placeholder="Ask a question..."
        />
        <button
          disabled={ loading }
          type="submit"
          className="bg-slate-900 h-10 px-4 py-2 text-neutral-100 text-sm font-medium rounded hover:bg-slate-900/90"
        >
          Ask
        </button>
      </form>
      { loading && <p className="py-2 text-sm text-neutral-400">Loading...</p> }
      { answer && <p className="my-4 text-md">{ answer }</p> }
    </div>
  );
};

export default QuestionSearch;
