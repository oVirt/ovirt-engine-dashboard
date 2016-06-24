export function convertValue (unitTable = [], unit, value) {
  let newUnit = unit
  let newValue = value

  const minThreshold = 0.1
  const maxThreshold = 1024
  const availableUnits = unitTable.map((obj) => obj.unit)

  if (availableUnits.includes(unit)) {
    const reversedUnitTable = unitTable.slice().reverse()

    // scale down (coarse to fine)
    unitTable.forEach((obj, index) => {
      if (newUnit === obj.unit && newValue <= minThreshold && index + 1 < unitTable.length) {
        const nextObj = unitTable[index + 1]
        newUnit = nextObj.unit
        newValue = newValue * nextObj.factor
      }
    })

    // scale up (fine to coarse)
    reversedUnitTable.forEach((obj, index) => {
      if (newUnit === obj.unit && newValue >= maxThreshold && index + 1 < reversedUnitTable.length) {
        const nextObj = reversedUnitTable[index + 1]
        newUnit = nextObj.unit
        newValue = newValue / obj.factor
      }
    })
  }

  return { unit: newUnit, value: newValue }
}
