// A few JavaScript Functions for Images and Files
// Author: Justin Mitchel
// Source: https://kirr.co/ndywes

// Convert a Base64-encoded string to a File object
export function base64StringtoFile(base64String, filename) {
  var arr = base64String.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

export async function getImage(imgSrc) {
  var img = new Image();
  const image = await new Promise((resolve) => {
    img.onload = function () {
      resolve(this);
    };
    img.src = imgSrc;
  });
  return image;
}

export const getCroppedImg = async (imageSrc, crop, dimensions) => {
  const image = await getImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  /* setting canvas width & height allows us to 
    resize from the original image resolution */
  canvas.width = dimensions.width;
  canvas.height = dimensions.height;
  const ext = extractImageFileExtensionFromBase64(imageSrc);
  ctx.drawImage(
    image,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    canvas.width,
    canvas.height
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob);
    }, "image/" + ext);
  });
};
export const blobUrlToBlob = async (imageSrc) => {
  const image = await getImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const ext = extractImageFileExtensionFromBase64(imageSrc);
  ctx.drawImage(image, 0, 0);

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob);
    }, "image/" + ext);
  });
};

export async function getImageDimensions(imgSrc) {
  var img = new Image();
  const dimensions = await new Promise((resolve) => {
    img.onload = function () {
      resolve({ width: this.width, height: this.height });
    };
    img.src = imgSrc;
  });
  return dimensions;
}

// Extract an Base64 Image's File Extension
export function extractImageFileExtensionFromBase64(base64Data) {
  return base64Data.substring(
    "data:image/".length,
    base64Data.indexOf(";base64")
  );
}

// Base64 Image to Canvas with a Crop
export function image64toCanvasRef(
  canvasRef,
  image64,
  pixelCrop,
  callback = () => console.log("image loaded")
) {
  const canvas = canvasRef; // document.createElement('canvas');
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx = canvas.getContext("2d");
  const image = new Image();
  image.src = image64;
  image.onload = function () {
    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );
    callback();
  };
}

export function dataURItoBlob(dataURI) {
  // convert base64/URLEncoded data component to raw binary data held in a string
  var byteString;
  if (dataURI.split(",")[0].indexOf("base64") >= 0)
    byteString = atob(dataURI.split(",")[1]);
  else byteString = unescape(dataURI.split(",")[1]);

  // separate out the mime component
  var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

  // write the bytes of the string to a typed array
  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], { type: mimeString });
}

// blob to image 64   async function blobToImage64(blob) {
export async function blobToImage64(blob) {
  const image64file = await new Promise(function (resolve) {
    const reader = new FileReader();

    reader.addEventListener(
      "load",
      () => {
        resolve(reader.result);
      },
      false
    );
    reader.readAsDataURL(blob);
  });
  return image64file;
}
