for size in 16 32 48; do
  magick convert favicon.png -background white -resize ${size}x${size} -flatten favicon_${size}.bmp
done

magick favicon*.bmp favicon.ico

mv favicon.ico assets/

rm favicon*.bmp
