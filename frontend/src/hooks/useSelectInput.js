import { useDispatch } from 'react-redux'

const useSelectInput = (id, propertyToChange, initialValue, changeValue) => {
  const dispatch = useDispatch()

  let changedProperty = {}

  const handleValue = async (newValue) => {
    changedProperty[propertyToChange] = newValue
    await dispatch(changeValue({ id, data: changedProperty }))
  }

  return [initialValue, handleValue]
}

export default useSelectInput