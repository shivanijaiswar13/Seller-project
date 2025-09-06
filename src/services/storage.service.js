
const ImageKit = require("imagekit");
import { v4 as uuidv4 } from 'uuid';


var imagekit = new ImageKit({
    publicKey : process.env.ImageKit_PUBLIC_KEY,
    privateKey : "your_private_api_key",
    urlEndpoint : process.env.ImageKit_URl_ENDPOINT
});

async function uploadFile(fileBuffer) {

    const result = await imagekit.upload({
        file: fileBuffer,
        fileName: uuidv4(),
        folder: "mern14-products"
    })

    return result
}


module.exports = { uploadFile }