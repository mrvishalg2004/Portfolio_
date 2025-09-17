# Image Optimization Guide

## CRITICAL: Your images are too large and slowing down the site!

### Current Issues:
- `profile.png`: 4.5MB (HUGE!)
- `passport pic.jpg`: 611KB (Too large)

### Immediate Actions Needed:

1. **Resize & Compress Images:**
   ```bash
   # Use online tools like:
   - https://tinypng.com/
   - https://squoosh.app/
   - https://imagecompressor.com/
   ```

2. **Target Sizes:**
   - Profile images: 300x300px, 30-50KB
   - Convert to WebP format for better compression

3. **Create WebP versions:**
   - Save as: `passport-pic.webp` (instead of jpg)
   - Save as: `profile.webp` (instead of png)

4. **Update image references in components:**
   - Hero.tsx: line 135
   - About.tsx: line 44

## This will reduce your initial page load by 4+ seconds!
