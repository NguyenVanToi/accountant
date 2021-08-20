import { IonActionSheet } from "@ionic/react";
import { useState } from "react";
import { cameraOutline, imageOutline, closeOutline } from 'ionicons/icons';
import { Camera, CameraOptions } from '@ionic-native/camera';
import uploadFile from "../_core/services/uploadFile";
const ActionChooseOption: React.FC<any> = (props) => {
    const {showActionSheet, setShowActionSheet, currentImages, setImages} = props;
    console.log('toinv');
    
    const takePicture = async(sourceType: number) => {
        const options: CameraOptions = {
            quality: 100,
            sourceType,
            destinationType: Camera.DestinationType.FILE_URI,
            encodingType: Camera.EncodingType.JPEG,
            mediaType: Camera.MediaType.PICTURE,
            correctOrientation: true,
            targetWidth: 400,
            targetHeight: 400
        }

        try {
            const imageUrl = await Camera.getPicture(options);
            console.log(imageUrl);
            const result: any = await uploadFile.upload(imageUrl);
            let images = [];
            console.log('result', result);
            
            if (result && result.length > 0) {
                images = result.map((res: any) => res.filename);
                setImages([...currentImages, ...images]);
            }
            
        } catch(e) {
            // Handle error
            console.log("Camera issue: " + e);
          }
    }

    return (
        <IonActionSheet
            isOpen={showActionSheet}
            onDidDismiss={() => setShowActionSheet(false)}
            cssClass='my-custom-class'
            buttons={[{
            text: 'Máy ảnh',
            icon: cameraOutline,
            handler: () => {
                console.log('Camera clicked');
                takePicture(Camera.PictureSourceType.CAMERA);
            }
            }, {
            text: 'Chọn ảnh từ thư viện',
            icon: imageOutline,
            handler: () => {
                console.log('Share clicked');
                takePicture(Camera.PictureSourceType.PHOTOLIBRARY);
            }
            }, {
            text: 'Huỷ',
            icon: closeOutline,
            role: 'cancel',
            handler: () => {
                console.log('Cancel clicked');
            }
            }]}
      >
      </IonActionSheet>
    )
}

export default ActionChooseOption
