const useColor = (endDate, phaseRaw) => {
  const getColor = () => {
    let [r, g, b, tt] = [230, 230, 230, 'Nisu uneti osnovni podaci.']

    if (!endDate || !phaseRaw) {
      return [r, g, b, tt]
    }

    const now = (new Date().getTime()) / 86400000
    const deadline = (new Date(endDate).getTime()) / 86400000
    const days = Math.floor(deadline - now)
    const phase = (parseInt(phaseRaw.slice(0,2)))

    if (phase === 10) {
      return [108, 196, 161, 'Uspešno završeno.']
    }

    if ([5, 6, 13].includes(phase)) {
      return [250, 234, 72, 'Čekanje daljih obaveštenja...']
    }

    if ([7, 8, 9].includes(phase)) {
      return [58, 176, 255, 'Prošli smo, pratiti dalja dešavanja.']
    }

    if ([11, 12].includes(phase)) {
      return [128, 128, 128, 'Nismo prošli, ili nismo ni slali ponudu.']
    }

    let colorNum = Math.round(255/10 * days*0.4 * phase*1.2)
    if (colorNum > 210) {
      colorNum = 210
    }
    if (colorNum < 0) {
      colorNum = 0
    }

    return [r, colorNum, colorNum, 'Potrebno pripremiti ponudu']
  }

  const color = getColor()

  return color
}

export default useColor