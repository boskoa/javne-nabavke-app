import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

const useInput = (id, propertyToChange, initialValue, changeValue) => {
  const [value, setValue] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    if (initialValue) {
      setValue(initialValue)
    }
  }, [initialValue])

  let changedProperty = {}

  const handleValue = async () => {
    changedProperty[propertyToChange] = value
    await dispatch(changeValue({ id, data: changedProperty }))
  }

  return [value, setValue, handleValue]
}

export default useInput