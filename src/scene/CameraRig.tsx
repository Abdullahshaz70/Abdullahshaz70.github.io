import { useFrame } from '@react-three/fiber'
import { PerspectiveCamera } from 'three'
import { poseAt } from '../lib/choreography'
import { scrollState } from '../lib/scrollState'

interface CameraRigProps {
  /** Narrow screens: pull back and keep the surface centred. */
  compact: boolean
}

/** Places the camera for the current scroll position before every rendered frame. */
export function CameraRig({ compact }: CameraRigProps) {
  useFrame(({ camera, size }) => {
    if (!(camera instanceof PerspectiveCamera)) return
    const pose = poseAt(scrollState.get(), compact)
    camera.position.set(...pose.camera)
    camera.lookAt(...pose.target)

    // Film offset slides the image sideways without rotating the camera, so
    // the figure sits beside the text column instead of under it.
    const aspect = size.width / size.height
    const halfHeight = Math.tan((camera.fov * Math.PI) / 360)
    camera.filmOffset = -pose.shift * 2 * halfHeight * aspect * camera.getFilmWidth()
    camera.updateProjectionMatrix()
  })
  return null
}
