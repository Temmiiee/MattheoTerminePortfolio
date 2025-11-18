import { ImageResponse } from 'next/og'
 
// Image metadata
export const size = {
  width: 512,
  height: 512,
}
export const contentType = 'image/png'
 
// Image generation
export default function Icon512() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 280,
          background: 'linear-gradient(135deg, #a259ff 0%, #8b3dff 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        MT
      </div>
    ),
    {
      ...size,
    }
  )
}
