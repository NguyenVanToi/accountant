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
import { Category } from '../../_core/api/api';
import { cogOutline, homeOutline, personOutline, documentTextOutline, constructOutline, hammerOutline } from 'ionicons/icons';
import { useEffect, useState } from 'react';
const CreateCategory: React.FC<{
    category: any
    onDismiss: () => void;
    editCategory: any,
    createCategory: any,
}> = ({  category, onDismiss, editCategory, createCategory }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const listIcons = [
        documentTextOutline,
        cogOutline,
        homeOutline,
        personOutline, 
        hammerOutline,
        constructOutline,
    ];
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {...category}
    });
    const [icon, setIcon] = useState(!category ? listIcons[0] : category.image);

    const onChooseIcon = (icon: string) => {
        console.log(category);
        setIcon(icon);
        setShowDropdown(false);
    }
    const onSubmit = (value: any) => {
        const cate: Category = { ...value, image: icon };
        if (category && category.id) {
            editCategory(cate);
            onDismiss();
            return;
        }
        createCategory(cate);
        onDismiss();
        return;
    };

    const renderListIcons = () => {
        return (
            <div className="lists drop-menu">
            {
                listIcons.map((icon, index) => (
                    <IonIcon icon={icon} key={index} className="drop-item icon" onClick={() => onChooseIcon(icon)} />
                ))
            }
            </div>
        )
    }
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
                    <IonLabel className="label">Biểu tượng</IonLabel>
                    <div
                        className={`dropdown form-control ${showDropdown ? 'show': ''} `}
                        onClick={() => setShowDropdown(!showDropdown)}>
                        {
                            icon && (
                                <IonIcon style={{fontSize: '1.4rem'}} icon={icon} color='primary'/>
                            )
                        }
                        {
                            showDropdown && renderListIcons()
                        }
                    </div>
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
