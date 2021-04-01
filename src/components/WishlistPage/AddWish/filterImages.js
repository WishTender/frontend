async function filterOutSmallImages(images, dim) {
  const imageDimensions = await Promise.all(
    images.map((image) => {
      console.log(image);
      return getImageDimensions(image);
    })
  );
  console.log("imageDimensions", imageDimensions);
  const filteredImages = [];
  for (const image in images) {
    const width = imageDimensions[image][0];
    const height = imageDimensions[image][1];
    if (width > dim && height > dim) {
      filteredImages.push(images[image]);
    }
  }
  console.log("filteredImages:", filteredImages);
  return filteredImages;
}

async function getImageDimensions(imgPath) {
  return new Promise((resolve) => {
    let image = new Image();
    image.src = imgPath;
    image.onload = function () {
      resolve([image.height, image.width]);
    };
    image.onerror = function () {
      resolve([0, 0]);
    };
  }).catch((err) => {
    console.log(err);
  });
}
export default filterOutSmallImages;
