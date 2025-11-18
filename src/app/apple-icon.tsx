import { ImageResponse } from 'next/og'
 
// Image metadata
export const size = {
  width: 180,
  height: 180,
}
export const contentType = 'image/png'
 
// Image generation
export default function AppleIcon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 80,
          background: 'linear-gradient(135deg, #a259ff 0%, #8b3dff 50%, #7020ff 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          borderRadius: '40px',
          boxShadow: '0 10px 40px rgba(162, 89, 255, 0.3)',
        }}
      >
        MT
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  )
}
