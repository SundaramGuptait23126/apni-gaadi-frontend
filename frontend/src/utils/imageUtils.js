export const optimizeCloudinaryUrl = (url, width = 800, quality = 'q_auto') => {
  if (!url || !url.includes('cloudinary.com')) return url;
  
  // Check if transformations are already present to avoid duplicates
  if (url.includes('/upload/f_auto')) return url;

  const parts = url.split('/upload/');
  if (parts.length === 2) {
    return `${parts[0]}/upload/f_auto,${quality},w_${width},c_limit/${parts[1]}`;
  }
  return url;
};
