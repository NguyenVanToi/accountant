import { useState } from 'react';
import './../global.css';
import {
    IonFab, IonFabButton,
    IonIcon,
    IonItem,
    IonItemOption,
    IonItemOptions,
    IonItemSliding,
    IonLabel,
    IonList,
    useIonModal
} from '@ionic/react';
import { pizzaOutline, flashOutline, addOutline } from 'ionicons/icons';
import CreateCategory from './CreateCategory';

const Category: React.FC = () => {
    const [list, setList] = useState([
        {
            id: 1,
            name: 'Ăn',
            type: 'EAT',
            icon: pizzaOutline
        },
        {
            id: 2,
            name: 'Điện',
            type: 'ELECTRIC',
            icon: flashOutline
        },
    ]);
    const [categorySelected, setCategorySelected] = useState(null);
    const renderList = () => {
        return (
            <IonList>
                {
                    list.map((item: any) => (
                        <IonItemSliding key={item?.id}>
                            <IonItem>
                                <IonIcon icon={item?.icon}/>
                                <IonLabel>{item?.name}</IonLabel>
                            </IonItem>
                            <IonItemOptions side="end">
                                <IonItemOption onClick={() => {
                                }}>Unread</IonItemOption>
                            </IonItemOptions>
                        </IonItemSliding>
                    ))
                }
            </IonList>
        );
    };

    const handleDismiss = () => {
        dismiss();
    };

    const [present, dismiss] = useIonModal(CreateCategory, {
        onDismiss: handleDismiss,
        activity: categorySelected
    });

    const createCategory = () => {
        setCategorySelected(null);
        present({
            cssClass: 'modal custom',
        });
    }

    return (
        <div className="container">
            {
                renderList()
            }
            <IonFab
                onClick={createCategory}
                vertical="bottom"
                horizontal="end"
                slot="fixed"
            >
                <IonFabButton>
                    <IonIcon icon={addOutline} />
                </IonFabButton>
            </IonFab>

        </div>
    );
};

export default Category;
