/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'pivnsfqramdzzbitmnie.supabase.co',
            },
        ],
    },
    env: {
        NEXT_PUBLIC_SUPABASE_URL: 'https://pivnsfqramdzzbitmnie.supabase.co',
        SUPABASE_SERVICE_ROLE_KEY:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpdm5zZnFyYW1kenpiaXRtbmllIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4NTE5MDk3NSwiZXhwIjoyMDAwNzY2OTc1fQ.tYknG_OJifL32N-2Rk2vl54eslDqyv0FeXzIn1-dJNc',
    },
};
module.exports = nextConfig;
