import { ImageResponse } from 'next/server';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'Blod | Qui Monte à Bord';
export const size = {
    width: 1065,
    height: 500,
};

export const contentType = 'image/png';

// Image generation
export default async function Image({ params }: { params: { id: string } }) {
    const article = await fetch(
        `http://localhost:3000/api/getPost?id=${params.id}`
    ).then((res) => res.json());
    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    fontSize: 50,
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
                {article?.title} <br />
                <span
                    style={{
                        fontSize: 28,
                        color: '#2d6a4f',
                        paddingTop: '20px',
                    }}
                >
                    {article?.author}
                </span>
                <br />
                <span
                    style={{
                        fontSize: 22,
                        color: '#737373',
                    }}
                >
                    {article?.date}
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
