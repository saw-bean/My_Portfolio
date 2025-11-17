// Script to extract dominant colors from PROFILE.jpeg
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function extractColors() {
    try {
        const imagePath = path.join(__dirname, 'images', 'PROFILE.jpeg');
        
        // Resize for faster processing
        const image = sharp(imagePath);
        const metadata = await image.metadata();
        
        // Extract dominant colors using k-means clustering
        const { dominant } = await image
            .resize(200, 200, { fit: 'inside' })
            .stats();
        
        // Get the most dominant colors
        const colors = dominant.map(color => ({
            r: color.r,
            g: color.g,
            b: color.b,
            hex: `#${color.r.toString(16).padStart(2, '0')}${color.g.toString(16).padStart(2, '0')}${color.b.toString(16).padStart(2, '0')}`
        }));
        
        // Find warm, muted tones suitable for UI
        const primaryColor = colors[0];
        const secondaryColor = colors[1] || colors[0];
        
        // Generate a palette based on extracted colors
        const palette = {
            primary: primaryColor.hex,
            primaryDark: darkenColor(primaryColor.hex, 0.2),
            primaryLight: lightenColor(primaryColor.hex, 0.2),
            secondary: secondaryColor.hex,
            accent: adjustSaturation(primaryColor.hex, 0.3),
            textPrimary: '#1F2937',
            textSecondary: '#4B5563',
            bgPrimary: '#FAFAFA',
            bgSecondary: '#F5F5F5'
        };
        
        console.log('Extracted Color Palette:');
        console.log(JSON.stringify(palette, null, 2));
        
        return palette;
    } catch (error) {
        console.error('Error extracting colors:', error.message);
        // Fallback to warm, portrait-friendly palette
        return getPortraitFriendlyPalette();
    }
}

function darkenColor(hex, amount) {
    const num = parseInt(hex.replace('#', ''), 16);
    const r = Math.max(0, Math.floor((num >> 16) * (1 - amount)));
    const g = Math.max(0, Math.floor(((num >> 8) & 0x00FF) * (1 - amount)));
    const b = Math.max(0, Math.floor((num & 0x0000FF) * (1 - amount)));
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

function lightenColor(hex, amount) {
    const num = parseInt(hex.replace('#', ''), 16);
    const r = Math.min(255, Math.floor((num >> 16) + (255 - (num >> 16)) * amount));
    const g = Math.min(255, Math.floor(((num >> 8) & 0x00FF) + (255 - ((num >> 8) & 0x00FF)) * amount));
    const b = Math.min(255, Math.floor((num & 0x0000FF) + (255 - (num & 0x0000FF)) * amount));
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

function adjustSaturation(hex, amount) {
    // Simplified saturation adjustment
    return lightenColor(hex, amount * 0.3);
}

function getPortraitFriendlyPalette() {
    // Warm, muted palette that works well with portrait photos
    return {
        primary: '#8B7355',
        primaryDark: '#6B5A45',
        primaryLight: '#A68B6F',
        secondary: '#9D8B7A',
        accent: '#B8A082',
        textPrimary: '#2C2418',
        textSecondary: '#5A4E42',
        bgPrimary: '#FAF8F5',
        bgSecondary: '#F5F2ED'
    };
}

extractColors();

