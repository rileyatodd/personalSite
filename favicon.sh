for size in 16 32 48; do
  magick convert favicon.png -background white -resize ${size}x${size} -flatten favicon_${size}.bmp
done