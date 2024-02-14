function test(){
    const S3 = require('aws-sdk/clients/s3')
    const fs = require('fs')

    const config = {
        endpoint: 'https://ap-south-1.linodeobjects.com/',
        accessKeyId: 'PPZKY8RRD9KGPILJ3EMJ',
        secretAccessKey: '1MingwheBUoF8CWhrW3eNAizNTmrxiPdB0kzXglc',
    }

    var s3 = new S3(config)

    function listObjects() {
        console.debug("List objects")
        const bucketParams = {
            Bucket: 'cfe2'
        }

        s3.listObjects(bucketParams, (err, data) => {
            if(err) {
                console.error("Error ", err)
            } else {
                console.info("Objects vol1 ", data)
            }
        })
    }
}

 // Start
 test();

 function uploadFile() {
    const fileStream = fs.createReadStream('C:/Users/ramit/OneDrive/Desktop/Files/Interview Files/Fatima/FatimaEID.jpg')
    var params = {Bucket: 'cfe2', Key: 'FatimaEID', Body: fileStream}
    s3.upload(params, function(err, data) {
        if(err) {
            console.error("Error uploading test file", err)
        } else {
            console.info("Test file uploaded ", data)
            listObjects()
        }
    })
}

 uploadFile();