// Disk img
import macLogo from 'projectAssets/stations/maclogo.png'
import serverLogo from 'projectAssets/stations/serverlogo.jpg'
import winLogo from 'projectAssets/stations/winlogo.png'

// Station img
import macDrive from 'projectAssets/drives/macdrive.png'
import winDrive from 'projectAssets/drives/windrive.png'

export const stationTypes = [
  {
    identifier: 'WINDOWS_WORKSTATION',
    drive: winDrive,
    logo: winLogo,
    type: 'Windows PC'
  },
  {
    identifier: 'WINDOWS_SERVER',
    drive: winDrive,
    logo: serverLogo,
    type: 'Windows Server'
  },
  {
    identifier: 'MAC',
    drive: macDrive,
    logo: macLogo,
    type: 'Mac'
  }
]
