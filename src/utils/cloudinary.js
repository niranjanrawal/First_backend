import { v2 as cloudinary } from "cloudinary";

import fs from "fs";

 cloudinary.config({ 
        cloud_name:process.env.CLOUDINARY_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret:process.env.CLOUDINARY_API_SECRET,  // Click 'View API Keys' above to copy your API secret
});

const uploadResult = async (localfilepath) =>{

    try{
        if(!localfilepath) return null

        const response = await cloudinary.uploader.upload(localfilepath , {
            resource_type : "auto"
        })
        console.log("file has been uploaded" , response.url)
        return response



    }catch(error){
        // if file has not been uploaded so its in our server we have to
        // remove it the local server
        fs.unlinkSync(localfilepath)
        return null

    }
    
}

export {cloudinary}
// const uploadResult = await cloudinary.uploader
//        .upload(
//            'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
//                public_id: 'shoes',
//            }
//        )
//        .catch((error) => {
//            console.log(error);
//        });
    
//     console.log(uploadResult);