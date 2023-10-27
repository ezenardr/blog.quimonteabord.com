import { ImageResponse } from 'next/server';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'Blog | Qui monte à Bord';
export const size = {
    width: 1065,
    height: 500,
};

export const contentType = 'image/png';

// Image generation
export default async function Image() {
    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    fontSize: 100,
                    color: '#081c15',
                    background: '#fff',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    fontFamily: 'serif',
                }}
            >
                Qui Monte à Bord <br />
                <span
                    style={{
                        fontSize: 28,
                        color: '#2d6a4f',
                    }}
                >
                    Célébrons le pouvoir des mots pour inspirer, émouvoir et
                    transformer !
                </span>
            </div>
        ),
        // ImageResponse options
        {
            // For convenience, we can re-use the exported opengraph-image
            // size config to also set the ImageResponse's width and height.
            ...size,
        }
    );
}
