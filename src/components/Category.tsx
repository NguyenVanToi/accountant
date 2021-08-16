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
import { pizzaOutline, flashOutline, addOutline } from 'ionicons/icons';
import CreateCategory from './CreateCategory';
import { connect } from 'react-redux';
import { Category } from '../_core/api/api';
import { deleteCategory, editCategory, fetchCategories, createCategory } from '../redux/actions/categoryAction';

const CategoryView: React.FC = (props: any) => {
    const [list, setList] = useState<Category[]>([]);
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
                                <IonItemOption onClick={() => {
                                }}>Unread</IonItemOption>
                            </IonItemOptions>
                        </IonItemSliding>
                    ))
                }
            </IonList>
        );
    };

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
