import { useDispatch } from 'react-redux'

const useNotificationBooleanInput = (id, propertyToChange, initialValue, changeValue) => {
  const dispatch = useDispatch()

  let changedProperty = {}

  const handleValue = async () => {
    changedProperty[propertyToChange] = initialValue
    await dispatch(changeValue({ id, ...changedProperty }))
  }

  return [initialValue, handleValue]
}

export default useNotificationBooleanInput