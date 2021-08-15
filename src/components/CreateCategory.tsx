import {
    IonButton,
    IonButtons, IonFab, IonFabButton,
    IonHeader,
    IonIcon, IonInput, IonItem, IonLabel, IonSelect, IonSelectOption, IonTextarea,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import { checkmarkOutline, arrowBackOutline } from 'ionicons/icons';
import { useForm } from 'react-hook-form';
const CreateCategory: React.FC<{
    category: any
    onDismiss: () => void;
}> = ({  category, onDismiss }) => {
    const { register, handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {...category}
    });
    const onSubmit = (value: any) => {
        console.log('createActivity', value);
    };

    return (
        <div>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton onClick={onDismiss} color="primary">
                            <IonIcon slot="icon-only" icon={arrowBackOutline}/>
                        </IonButton>
                    </IonButtons>
                    <IonTitle>Danh muc</IonTitle>
                </IonToolbar>
            </IonHeader>

            <form className="form">
                <div className="form-control">
                    <IonItem>
                        <IonLabel>Tên</IonLabel>
                        <IonInput
                            {...register("name", { required: true })}
                        />
                    </IonItem>
                    {errors.name && <span className="mess-error">(*) Bắt buộc.</span>}
                </div>

                <div className="form-control">
                    <IonItem>
                        <IonLabel>Ghi chú</IonLabel>
                        <IonTextarea
                            {...register("amount", { required: true })}
                            rows={5}
                        />
                    </IonItem>
                    {errors.description && <span className="mess-error">(*) Bắt buộc.</span>}

                </div>
            </form>
            <IonFab
                onClick={handleSubmit(onSubmit)}
                vertical="bottom"
                horizontal="end"
                slot="fixed"
            >
                <IonFabButton type="submit">
                    <IonIcon icon={checkmarkOutline} />
                </IonFabButton>
            </IonFab>
        </div>
    )
};

export default CreateCategory;
