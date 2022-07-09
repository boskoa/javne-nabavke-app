import { useDispatch } from 'react-redux'

const useCondition = (id, initialValue, changeValue, deleteValue) => {
  const dispatch = useDispatch()

  const handleValue = async (event) => {
    await dispatch(changeValue({ id, reqDone: initialValue }))
    event.target.checked = !event.target.checked
  }

  const handleDelete = async () => {
    dispatch(deleteValue(parseInt(id)))
  }

  return [initialValue, handleValue, handleDelete]
}

export default useCondition