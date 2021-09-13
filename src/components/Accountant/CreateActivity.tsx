import {
    IonButton,
    IonButtons, IonFab, IonFabButton,
    IonHeader,
    IonIcon, IonInput, IonItem, IonLabel, IonSelect, IonSelectOption, IonTextarea,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import { checkmarkOutline, arrowBackOutline, addCircleOutline, imagesOutline } from 'ionicons/icons';
import { useForm } from 'react-hook-form';
import SelectCustom from '../../partials/SelectCustom';
import { Activity, Category } from '../../_core/api/api';
import { useState } from 'react';
import ActionChooseOption from '../../partials/ActionChooseOption';
import { API_URL } from '../../_core/environment';
import { AccountingType } from '../../_core/constants';
const CreateActivity: React.FC<{
    activity: any
    onDismiss: () => void;
    createActivity: any,
    editActivity: any,
    categories: Category[]
}> = ({  activity, onDismiss, createActivity, editActivity, categories }) => {
    const { register, handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {...activity}
    });
    const [showActionSheet, setShowActionSheet] = useState(false);
    const [images, setImages] = useState(activity?.images || []);
    const urlUpload = `${API_URL}/image`

    const onSubmit = (value: any) => {
        const act: Activity = { ...value, images };
        if (activity && activity.id) {
            editActivity(act);
            onDismiss();
            return;
        }
        createActivity(act);
        onDismiss();
        return;
    };
    const accountingTypes = Object.values(AccountingType).map((type) => {
        let name = '';
        switch (type) {
            case AccountingType.INCOME:
                name = 'Thu';
                break;
            case AccountingType.OUTCOME:
                name = 'Chi';
                break;
            default:
                name = 'Không xác định';
                break;
        }
        return {id: type, name};
    })

    return (
        <div className="create-activity">
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton onClick={onDismiss} color="primary">
                            <IonIcon slot="icon-only" icon={arrowBackOutline}/>
                        </IonButton>
                    </IonButtons>
                    <IonTitle>Tạo hành động</IonTitle>
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
                <div className="form-group small">
                    <IonLabel className="label">Danh mục</IonLabel>
                    <SelectCustom
                        className="form-control"
                        name="categoryId"
                        type="popover"
                        {...{ control, register,  choices: categories }}
                    />
                    {errors.category && <span className="mess-error">(*) Bắt buộc.</span>}
                </div>
                <div className="form-group small">
                    <IonLabel className="label">Loại</IonLabel>
                    <SelectCustom
                        className="form-control"
                        name="type"
                        type="popover"
                        {...{ control, register,  choices: accountingTypes }}
                    />
                    {errors.type && <span className="mess-error">(*) Bắt buộc.</span>}

                </div>

                <div className="form-group">
                    <IonLabel className="label">Số tiền</IonLabel>
                    <IonInput
                        type="number"
                        className="form-control"
                        {...register("amount", { required: true })}
                    />
                    {errors.amount && <span className="mess-error">(*) Bắt buộc.</span>}

                </div>
                <div className="form-group">
                    <IonLabel className="label">Ghi chú</IonLabel>
                    <IonTextarea
                        className="form-control"
                        {...register("description", { required: false })}
                        rows={5}
                    />
                </div>
                <div className="wrap-upload form-group">
                    <IonLabel className="label">Hình ảnh minh hoạ</IonLabel>
                    {
                        images?.length > 0 ? images.map((image: string) => (
                            <div className="form-control image" key={image}>
                                <img src={`${urlUpload}/${image}`} alt="image" />
                            </div>
                        )) : null
                    }
                    <div className={`${images?.length > 0 ? 'have-image' : ''} upload`}>
                        <label className="fake" htmlFor="upload" onClick={() => setShowActionSheet(true)}>
                            <IonIcon icon={imagesOutline} className="icon"/>
                        </label>
                        <ActionChooseOption
                            showActionSheet={showActionSheet}
                            setShowActionSheet={setShowActionSheet}
                            currentImages={images}
                            setImages={setImages}
                        />
                    </div>
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

export default CreateActivity;
