const fs = require('fs');
const path = require('path');

const files = ['index.html', 'styles.css', 'app.js', 'fedex_delivery_truck.jpg'];
const distDir = path.join(__dirname, 'dist');

console.log('Starting build copy...');

try {
    if (!fs.existsSync(distDir)) {
        fs.mkdirSync(distDir, { recursive: true });
        console.log('Created dist/ directory.');
    }

    files.forEach(file => {
        const src = path.join(__dirname, file);
        const dest = path.join(distDir, file);
        if (fs.existsSync(src)) {
            fs.copyFileSync(src, dest);
            console.log(`Copied: ${file} -> dist/${file}`);
        } else {
            console.error(`Error: Source file ${file} not found in root!`);
            process.exit(1);
        }
    });

    console.log('Build completed successfully!');
} catch (err) {
    console.error('Build failed with error:', err);
    process.exit(1);
}
