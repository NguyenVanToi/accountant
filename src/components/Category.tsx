import { useEffect, useState } from 'react';
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
import { addOutline, trashBinOutline, cogOutline, homeOutline, personOutline, documentTextOutline, constructOutline, hammerOutline } from 'ionicons/icons';
import CreateCategory from './CreateCategory';
import { connect } from 'react-redux';
import { Category } from '../_core/api/api';
import { deleteCategory, editCategory, fetchCategories, createCategory } from '../redux/actions/categoryAction';

const CategoryView: React.FC = (props: any) => {
    const [list, setList] = useState<Category[]>([]);
    const listIcons = [
        'cogOutline',
        'homeOutline',
        'personOutline', 
        'hammerOutline',
        'constructOutline',
        'documentTextOutline'
    ]
    useEffect(() => {
        const fetchCategories = async () => {
            props.fetchCategories();
        }

        fetchCategories();
    }, []);
    useEffect(() => {
        setList(props.categories);
    }, [props.categories]);
    const [categorySelected, setCategorySelected] = useState<Category | null>(null);

    const handleDismiss = () => {
        dismiss();
    };

    const [present, dismiss] = useIonModal(CreateCategory, {
        onDismiss: handleDismiss,
        category: categorySelected,
        createCategory: props.createCategory,
        editCategory: props.editCategory,
    });

    const handleCategory = (category?: Category) => {
        if (category && category.id) {
            setCategorySelected(category);
        } else {
            setCategorySelected(null);
        }
        present({
            cssClass: 'modal custom'
        });
    }

    const deleteCategory = (category: Category) => {
        props.deleteCategory(category);
    }

    const renderList = () => {
        return (
            <IonList>
                {
                    list.map((item: Category) => (
                        <IonItemSliding key={item?.id}>
                            <IonItem onClick={() => handleCategory(item)}>
                                <IonIcon icon={item?.image}/>
                                <IonLabel>{item?.code} - {item?.name}</IonLabel>
                            </IonItem>
                            <IonItemOptions side="end">
                                <IonItemOption color="danger" onClick={() => deleteCategory(item)}>
                                    <IonIcon icon={trashBinOutline} />
                                </IonItemOption>
                            </IonItemOptions>
                        </IonItemSliding>
                    ))
                }
            </IonList>
        );
    };
    const renderListIcons = () => {
        return (
            listIcons.map(icon => (
                <IonIcon icon={icon} key={icon} />
            ))
        )
    }

    return (
        <div className="container">
            {
                renderList()
            }
            <IonFab
                onClick={() => handleCategory()}
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
const mapStateToProps = (state: any) => {
    return {
        categories: Object.values(state.category),
    }
}

export default connect(
    mapStateToProps,
    {
        fetchCategories,
        createCategory,
        editCategory,
        deleteCategory
    }
)(CategoryView);
