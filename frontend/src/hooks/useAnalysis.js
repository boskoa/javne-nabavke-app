import { useState } from 'react'

const useAnalysis = (request, start, end) => {
  const [result, setResult] = useState(null)


  const makeRequest = async (start, end) => {
    const response = await request(start, end)
    return response
  }

  setResult(makeRequest(start, end))

  console.log(result)
  return result
}

export default useAnalysis

//fAJl za brisanje