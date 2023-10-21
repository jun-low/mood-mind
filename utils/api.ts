const createURL = (path: string) => window.location.origin + path

export const deleteEntry = async (id: string) => {
  const url: string = createURL(`/api/journal/${id}`);
  try {
    const res: Response = await fetch(url, {
      method: 'DELETE',
    });

    if (res.ok) {
      return res.json();
    } else {
      const errorData = await res.json();
      throw new Error(`Error deleting entry: ${errorData.message}`);
    }
  } catch (error: any) {
    throw new Error(`Network error while deleting entry: ${error.message}`);
  }
}

export const newEntry = async () => {
  const res = await fetch(
    new Request(createURL('/api/journal'), {
      method: 'POST',
      body: JSON.stringify({ content: 'Write about your day...' }),
    })
  )

  if (res.ok) {
    return res.json()
  } else {
    throw new Error('Something went wrong on API server!')
  }
}

export const updateEntry = async (id: string, updates: object) => {
  const res = await fetch(
    new Request(createURL(`/api/journal/${id}`), {
      method: 'PATCH',
      body: JSON.stringify({ updates }),
    })
  )

  if (res.ok) {
    return res.json()
  } else {
    throw new Error('Something went wrong on API server!')
  }
}

export const askQuestion = async (question: string) => {
  const res = await fetch(
    new Request(createURL(`/api/question`), {
      method: 'POST',
      body: JSON.stringify({ question }),
    })
  )

  if (res.ok) {
    return res.json()
  } else {
    throw new Error('Something went wrong on API server!')
  }
}
