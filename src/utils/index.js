function stateHelper(arr, initData, { suffix = '' } = {}) {
    arr = [].concat(arr);
    let stateObj = {};
    for (let i of arr) {
        stateObj[i + suffix] = initData();
    }
    return stateObj;
}
function mutationsHelper(arr, funs, { suffix = '' } = {}) {
    arr = [].concat(arr);
    let mutationsObj = {};
    let keys = Object.keys(funs);
    for (let i of arr) {
        for (let k of keys) {
            let str = i[0].toUpperCase() + i.slice(1);
            mutationsObj[k + str] = (...args) => funs[k](i + suffix, ...args);
        }
    }
    return mutationsObj;
}
function realOffset(element) {
    function _realOffset(element, x, y) {
        let parent = element.offsetParent;
        x += element.offsetLeft;
        y += element.offsetTop;
        if (parent === null) return { x, y };
        else return _realOffset(parent, x, y);
    }
    return _realOffset(element, 0, 0);
}
function gussian(imgUrl, x1 = 0, x2 = 1, y1 = x1, y2 = x2) {
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    let image = new Image();
    let imageData = null;
    let newImageData = null;
    let sigma = 20;
    let radius = 5;
    let gussianArray = GussianArray(sigma, radius);
    let width = 0;
    let height = 0;
    let dataUrl = '';
    function GussianArray(sigma, radius) {
        let arr = [];
        let le = 1 / (Math.sqrt(2 * Math.PI) * sigma);
        let reb = -1 / (2 * sigma ** 2);
        let sum = 0;
        for (let i = -radius; i <= radius; i++) {
            arr[i + radius] = le * Math.exp(reb * i ** 2);
            sum += arr[i + radius];
        }

        return arr.map(function (item) {
            return item / sum;
        });
    }
    function gussianFilter(imageData, sw = 0, sh = 0, ew = imageData.width, eh = imageData.height) {
        let newImageData = Uint8ClampedArray.from(imageData.data);
        let x, y;
        for (y = sh; y < eh; y++) {
            for (x = sw; x < ew; x++) {
                let r = 0;
                let g = 0;
                let b = 0;
                let a = 0;
                let sum = 0;
                for (let i = -radius; i <= radius; i++) {
                    let rx = x + i;
                    if (rx >= 0 && rx < imageData.width) {
                        r += newImageData[rx * 4 + y * imageData.width * 4] * gussianArray[i + radius];
                        g += newImageData[rx * 4 + 1 + y * imageData.width * 4] * gussianArray[i + radius];
                        b += newImageData[rx * 4 + 2 + y * imageData.width * 4] * gussianArray[i + radius];
                        a += newImageData[rx * 4 + 3 + y * imageData.width * 4] * gussianArray[i + radius];
                        sum += gussianArray[i + radius];
                    }
                }
                r /= sum;
                g /= sum;
                b /= sum;
                a /= sum;
                newImageData[(y * imageData.width + x) * 4] = r;
                newImageData[(y * imageData.width + x) * 4 + 1] = g;
                newImageData[(y * imageData.width + x) * 4 + 2] = b;
                newImageData[(y * imageData.width + x) * 4 + 3] = a;
            }
        }
        for (x = sw; x < ew; x++) {
            for (y = sh; y < eh; y++) {
                let r = 0;
                let g = 0;
                let b = 0;
                let a = 0;
                let sum = 0;
                for (let i = -radius; i <= radius; i++) {
                    let ry = y + i;
                    if (ry >= 0 && ry < imageData.height) {
                        r += newImageData[(ry * imageData.width + x) * 4] * gussianArray[i + radius];
                        g += newImageData[(ry * imageData.width + x) * 4 + 1] * gussianArray[i + radius];
                        b += newImageData[(ry * imageData.width + x) * 4 + 2] * gussianArray[i + radius];
                        a += newImageData[(ry * imageData.width + x) * 4 + 3] * gussianArray[i + radius];
                        sum += gussianArray[i + radius];
                    }
                }
                r /= sum;
                g /= sum;
                b /= sum;
                a /= sum;
                newImageData[(y * imageData.width + x) * 4] = r;
                newImageData[(y * imageData.width + x) * 4 + 1] = g;
                newImageData[(y * imageData.width + x) * 4 + 2] = b;
                newImageData[(y * imageData.width + x) * 4 + 3] = a;
            }
        }
        return new ImageData(newImageData, imageData.width, imageData.height);

    }
    return new Promise((resolve) => {
        image.src = imgUrl;
        image.onload = function () {
            width = this.width;
            height = this.height;
            let widthStart = Math.round(width * x1);
            let heightStart = Math.round(height * y1);
            let widthEnd = Math.round(width * x2);
            let heightEnd = Math.round(height * y2);
            width = widthEnd - widthStart;
            height = heightEnd - heightStart;
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(this, widthStart, heightStart, widthEnd, heightEnd, 0, 0, width, height);
            imageData = ctx.getImageData(0, 0, width, height);
            newImageData = gussianFilter(imageData, 0, 0, width, height);
            ctx.putImageData(newImageData, 0, 0);
            dataUrl = canvas.toDataURL();
            resolve(dataUrl);
        };
    });
}
export { realOffset, gussian, stateHelper, mutationsHelper };