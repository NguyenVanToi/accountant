import { IonLoading } from "@ionic/react";

const Loading = ({ showLoading }: any) => {
    console.log('showLoading', showLoading);
    
    return (
        <IonLoading
            cssClass='my-custom-class'
            isOpen={showLoading}
            message={'Please wait...'}
            duration={5000}
            mode="ios"
      />
    )
}
export default Loading;