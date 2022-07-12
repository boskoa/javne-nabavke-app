import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

const useDateInput = (id, propertyToChange, initialValue, changeValue) => {
  const [value, setValue] = useState('')
  const [finalValue, setFinalValue] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if (initialValue) {
      setValue(initialValue)
    }
  }, [initialValue])

  useEffect(() => {
    if (finalValue) {
      handleValue()
    }
  }, [finalValue])

  let changedProperty = {}

  const handleValue = async () => {
    changedProperty[propertyToChange] = value.toString()
    await dispatch(changeValue({ id, data: changedProperty }))
  }

  return [value, setValue, setFinalValue]
}

export default useDateInput