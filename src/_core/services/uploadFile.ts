import { AccountingApi } from "../api/accountingApi"
import { ContentType, RequestParams } from "../api/api";
import { API_URL } from "../environment";
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { resolve } from "dns";


export default {
    upload: async (imagePath: string) => {
         const url = `${API_URL}/upload`;
         const options = {
             fileKey: 'file',
             chunkedMode: false,
             mimeType: 'multipart/form-data'
         };
         const fileTransferObject: FileTransferObject = FileTransfer.create();
         const data = await fileTransferObject.upload(imagePath, url, options);
         console.log('toinvhjihi', JSON.parse(data.response));
         
         return new Promise(resolve => resolve(JSON.parse(data.response)));      
    }
}