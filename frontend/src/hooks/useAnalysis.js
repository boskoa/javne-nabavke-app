import { useEffect, useState } from 'react'

const useAnalysis = (request, start, end) => {
  const [result, setResult] = useState(null)

  useEffect(() => {
    setResult(makeRequest(start, end))
  }, [])
  const makeRequest = async (start, end) => {
    const response = await request(start, end)
    return response
  }

  console.log(result)
  return result
}

export default useAnalysis