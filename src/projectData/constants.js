// Disk img
import macLogo from 'projectAssets/stations/maclogo.png'
import serverLogo from 'projectAssets/stations/serverlogo.jpg'
import winLogo from 'projectAssets/stations/winlogo.png'

// Station img
import macDrive from 'projectAssets/drives/macdrive.png'
import winDrive from 'projectAssets/drives/windrive.png'
import DEVICE_TYPES from 'projectData/deviceTypes'

const { windows, winServer, mac } = DEVICE_TYPES

export const FIELD_LENGTHS = {
  deviceMaxLength: 30,
  maxHddCapacity: 1000000
}

export const STATION_TYPES = [
  {
    drive: winDrive,
    logo: winLogo,
    ...windows
  },
  {
    drive: winDrive,
    logo: serverLogo,
    ...winServer
  },
  {
    drive: macDrive,
    logo: macLogo,
    ...mac
  }
]

export const BASE_FILTER_FLAGS = {
  all: 'All',
  none: 'None'
}

export const SORT_BY_OPTIONS = [
  'None',
  'System Name',
  'Highest HDD Capacity',
  'Lowest HDD Capacity'
]
