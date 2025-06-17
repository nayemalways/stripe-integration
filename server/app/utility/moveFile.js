
// Helper function to move the file
export function movefile(file, uploadPath){
    return new Promise((resolve, reject) => {
        file.mv(uploadPath, err => {
            if(err){
                return reject(err);
            }
            resolve();
        })
    })
}




// Helper function to move the file (This is customized by me)
/* export function movefile(file, uploadPath){
    file.mv(uploadPath, err => {
        if(err){
            return err;
        }
    })
} */