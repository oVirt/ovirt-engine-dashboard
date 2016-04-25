// TODO(vs) this is complex enough to have a unit test

// scale down
// convertValue(STORAGE_UNIT_TABLE, 'TB', 0.001) -> { unit: "GB", value: 1.024 }
// convertValue(STORAGE_UNIT_TABLE, 'TB', 0.000001) -> { unit: "MB", value: 1.048576 }
// convertValue(STORAGE_UNIT_TABLE, 'GB', 0.001) -> { unit: "MB", value: 1.024 }
//
// scale up
// convertValue(STORAGE_UNIT_TABLE, 'MB', 10000) -> { unit: "GB", value: 9.765625 }
// convertValue(STORAGE_UNIT_TABLE, 'MB', 10000000) -> { unit: "TB", value: 9.5367431640625 }
// convertValue(STORAGE_UNIT_TABLE, 'GB', 10000) -> { unit: "TB", value: 9.765625 }
//
// bad unit
// convertValue(STORAGE_UNIT_TABLE, 'XX', 1) -> { unit: "XX", value: 1 }

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
