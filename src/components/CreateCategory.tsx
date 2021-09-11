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
                    <IonTitle>Danh mục</IonTitle>
                </IonToolbar>
            </IonHeader>

            <form className="form container">
                <div className="form-group">
                        <IonLabel className="label">Tên</IonLabel>
                        <IonInput
                            className="form-control"
                            {...register("name", { required: true })}
                        />
                    {errors.name && <span className="mess-error">(*) Bắt buộc.</span>}
                </div>
                <div className="form-group">
                    <IonLabel className="label">Code</IonLabel>
                    <IonInput
                        className="form-control"
                        {...register("code", { required: true })}
                    />
                    {errors.code && <span className="mess-error">(*) Bắt buộc.</span>}
                </div>

                <div className="form-group">
                    <IonLabel className="label">Ghi chú</IonLabel>
                    <IonTextarea
                        className="form-control"
                        {...register("description", { required: false })}
                        rows={5}
                    />

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
