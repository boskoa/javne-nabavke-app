import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

const useCurrencyInput = (id, propertyToChange, initialValue, changeValue) => {
  const [value, setValue] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    if (initialValue) {
      setValue(Intl.NumberFormat('sr-BA', {
        style: 'currency', currency: 'BAM'
      }).format(initialValue))
    }
    console.log('Promena stejta')
  }, [initialValue])

  let changedProperty = {}

  const handleValue = async () => {
    let formatValue = value
    formatValue = formatValue.replace(' KM','')
    formatValue = formatValue.replace('.','')
    formatValue = formatValue.replace(',','.')
    changedProperty[propertyToChange] = parseFloat(formatValue)
    console.log('Promena u bazi', changedProperty[propertyToChange])
    await dispatch(changeValue({ id, data: changedProperty }))
  }

  return [value, setValue, handleValue]
}

export default useCurrencyInput