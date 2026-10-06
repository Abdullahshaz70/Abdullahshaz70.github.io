/**
 * How much 3D this device should attempt, checked once up front.
 *
 * - `none`: no WebGL at all.
 * - `limited`: WebGL only via a software renderer (the browser reports a
 *   "major performance caveat"), or the device advertises itself as low-end
 *   or data-saving. These get the static poster.
 * - `full`: hardware-accelerated WebGL on a capable device.
 */
export type GraphicsTier = 'none' | 'limited' | 'full'

interface DeviceHints {
  deviceMemory?: number
  connection?: { saveData?: boolean }
}

function probe(options?: WebGLContextAttributes): boolean {
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl2', options) ?? canvas.getContext('webgl', options)
    gl?.getExtension('WEBGL_lose_context')?.loseContext()
    return gl !== null
  } catch {
    return false
  }
}

export function detectGraphicsTier(): GraphicsTier {
  if (!probe({ failIfMajorPerformanceCaveat: true })) return probe() ? 'limited' : 'none'

  const hints = navigator as Navigator & DeviceHints
  const lowEnd = navigator.hardwareConcurrency <= 2 || (hints.deviceMemory ?? Infinity) <= 2
  if (lowEnd || hints.connection?.saveData) return 'limited'
  return 'full'
}
