import { useState } from 'react'
import { useDispatch } from 'react-redux'

const useNewCondition = (id, addNew) => {
  const [value, setValue] = useState('')
  const dispatch = useDispatch()

  const handleNew = async (event) => {
    event.preventDefault()
    await dispatch(addNew({ name: value, checked: false, procedureId: parseInt(id) }))
    setValue('')
    event.target.checked = value
  }

  return [value, setValue, handleNew]
}

export default useNewCondition