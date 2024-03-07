/** @type {import('next').NextConfig} */
import CopyWebpackPlugin from 'copy-webpack-plugin';
// next.config.js
const nextConfig = {
    webpack: (config, { isServer }) => {
        // Include the web.config file
        config.plugins.push(
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: 'web.config', 
                        to: '', 
                    },
                ],
            })
        );

        return config;
    },
};
export default nextConfig;
