export const loadImage = (path: string): Promise<HTMLImageElement> => {
  return new Promise((resolve) => {
    let img = new window.Image();
    img.setAttribute("crossOrigin",'anonymous')
    img.src = path;
    img.onload = () => {
      resolve(img)
    }
  })
}
