const useColor = (endDate, phaseRaw) => {
  const getColor = () => {
    let [r, g, b] = [230, 230, 230]

    if (!endDate || !phaseRaw) {
      return [r, g, b]
    }

    const now = (new Date().getTime()) / 86400000
    const deadline = (new Date(endDate).getTime()) / 86400000
    const days = Math.floor(deadline - now)
    const phase = (parseInt(phaseRaw.slice(0,2)))
    console.log('ENDATE', days, (new Date().getTime()) / 86400000, endDate, (new Date(endDate).getTime()) / 86400000)

    if (phase === 10) {
      return [108, 196, 161]
    }

    if ([5, 6, 13].includes(phase)) {
      return [250, 234, 72]
    }

    if ([7, 8, 9].includes(phase)) {
      return [58, 176, 255]
    }

    if ([11, 12].includes(phase)) {
      return [128, 128, 128]
    }

    let colorNum = Math.round(255/10 * days*0.4 * phase*1.2)
    if (colorNum > 210) {
      colorNum = 210
    }
    if (colorNum < 0) {
      colorNum = 0
    }
    console.log('COLOR', colorNum)

    return [r, colorNum, colorNum]
  }

  const color = getColor()

  return color
}

export default useColor