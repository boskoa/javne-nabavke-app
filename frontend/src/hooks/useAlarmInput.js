import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

const useAlarmInput = (alarmId, propertyToChange, initialValue, changeValue) => {
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
    await dispatch(changeValue({
      id: alarmId, ...changedProperty
    }))
  }

  return [value, setValue, setFinalValue]
}

export default useAlarmInput