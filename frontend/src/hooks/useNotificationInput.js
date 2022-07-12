import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

const useNotificationInput = (id, propertyToChange, initialValue, changeValue, updateProcedure) => {
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
    await dispatch(changeValue({ id, ...changedProperty }))
    dispatch(updateProcedure(changedProperty))
  }

  return [value, setValue, handleValue]
}

export default useNotificationInput