// Script to download relevant images for the portfolio
import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesDir = path.join(__dirname, 'images');

// Ensure images directory exists
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
}

// Unsplash image URLs (using their source API - free to use)
const images = {
    'profile.jpg': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces',
    'about-work.jpg': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop',
    'skills-tech.jpg': 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=600&fit=crop',
    'experience.jpg': 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=500&fit=crop',
    'project-rag.jpg': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
    'project-fraud.jpg': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    'project-cnn.jpg': 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=600&h=400&fit=crop',
    'project-sentiment.jpg': 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop',
    'project-maintenance.jpg': 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop',
    'project-recommendation.jpg': 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop'
};

function downloadImage(url, filename) {
    return new Promise((resolve, reject) => {
        const filepath = path.join(imagesDir, filename);
        const file = fs.createWriteStream(filepath);
        
        https.get(url, (response) => {
            if (response.statusCode === 200) {
                response.pipe(file);
                file.on('finish', () => {
                    file.close();
                    console.log(`✓ Downloaded: ${filename}`);
                    resolve();
                });
            } else if (response.statusCode === 302 || response.statusCode === 301) {
                // Handle redirects
                https.get(response.headers.location, (redirectResponse) => {
                    redirectResponse.pipe(file);
                    file.on('finish', () => {
                        file.close();
                        console.log(`✓ Downloaded: ${filename}`);
                        resolve();
                    });
                }).on('error', reject);
            } else {
                file.close();
                fs.unlinkSync(filepath);
                reject(new Error(`Failed to download ${filename}: ${response.statusCode}`));
            }
        }).on('error', (err) => {
            file.close();
            if (fs.existsSync(filepath)) {
                fs.unlinkSync(filepath);
            }
            reject(err);
        });
    });
}

async function downloadAllImages() {
    console.log('Starting image downloads...\n');
    
    const entries = Object.entries(images);
    
    for (const [filename, url] of entries) {
        try {
            await downloadImage(url, filename);
            // Small delay to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, 500));
        } catch (error) {
            console.error(`✗ Error downloading ${filename}:`, error.message);
        }
    }
    
    console.log('\n✓ Image download process completed!');
    console.log(`Images saved to: ${imagesDir}`);
}

// Run the download
downloadAllImages().catch(console.error);

