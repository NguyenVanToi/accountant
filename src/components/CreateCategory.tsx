import {
    IonButton,
    IonButtons, IonFab, IonFabButton,
    IonHeader,
    IonIcon, IonInput, IonItem, IonLabel, IonTextarea,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import { checkmarkOutline, arrowBackOutline } from 'ionicons/icons';
import { useForm } from 'react-hook-form';
import { Category } from '../_core/api/api';
import { editCategory } from '../redux/actions/categoryAction';
const CreateCategory: React.FC<{
    category: any
    onDismiss: () => void;
    editCategory: any,
    createCategory: any,
}> = ({  category, onDismiss, editCategory, createCategory }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {...category}
    });
    const onSubmit = (value: any) => {
        console.log('category', value);
        const cate: Category = { ...value };
        if (category && category.id) {
            editCategory(cate);
            onDismiss();
            return;
        }
        createCategory(cate);
        onDismiss();
        return;
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
                        <IonLabel>Code</IonLabel>
                        <IonInput
                            {...register("code", { required: true })}
                        />
                    </IonItem>
                    {errors.code && <span className="mess-error">(*) Bắt buộc.</span>}
                </div>

                <div className="form-control">
                    <IonItem>
                        <IonLabel>Ghi chú</IonLabel>
                        <IonTextarea
                            {...register("description", { required: false })}
                            rows={5}
                        />
                    </IonItem>

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
