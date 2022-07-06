import { useDispatch } from 'react-redux'

const useBooleanInput = (id, propertyToChange, initialValue, changeValue) => {
  const dispatch = useDispatch()

  let changedProperty = {}

  const handleValue = async () => {
    changedProperty[propertyToChange] = !initialValue
    await dispatch(changeValue({ id, data: changedProperty }))
  }

  return [initialValue, handleValue]
}

export default useBooleanInput