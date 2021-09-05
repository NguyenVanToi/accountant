import { useEffect, useState } from 'react';
import './../global.css';
import './Accountant.css';
import { AccountingType, UNIT } from '../_core/constants';
import {
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    useIonModal
} from '@ionic/react';
import { arrowDown, arrowUp, addOutline, trashBinOutline, filterOutline } from 'ionicons/icons';
import CurrencyFormat from 'react-currency-format';
import CreateActivity from './CreateActivity';
import { connect } from 'react-redux';
import { fetchActivities } from '../redux/actions';
import { Activity } from '../_core/api/api';
import { fetchCategories } from '../redux/actions/categoryAction';
import moment from 'moment';
import FilterView from './FilterView';

const Search: React.FC = (props: any) => {

    const [list, setList] = useState<Activity[]>([]);
    const [activitySelected, setActivitySelected] = useState<Activity | null>(null);
    const [filter, setFilter] = useState<{
        categoryId?: number,
        type?: string | null,
        createdAt?:  string | null,
    }>({
        categoryId: 0,
        type: null,
        createdAt: null
    });
    useEffect(() => {
        props.fetchCategories()
    }, []);

    useEffect(() => {
        setList(props.activities);
    }, [props.activities]);


    const handleDismiss = () => {
        dismiss();
    };
    const handleDismissFilter = () => {
        dismissFilter();
    };

    const [present, dismiss] = useIonModal(CreateActivity, {
        onDismiss: handleDismiss,
        activity: activitySelected,
        categories: props.categories
    });
    const [presentFilter, dismissFilter] = useIonModal(FilterView, {
        onDismiss: handleDismissFilter,
        categories: props.categories,
        fetchActivities: props.fetchActivities,
        filter: filter,
        setFilter: setFilter,
        isCreatedAt: true
    });

    const handleActivity = (activity: Activity) => {
        setActivitySelected(activity);
        present({
            cssClass: 'modal custom',
        });
    }

    const deleteActivity = (activity: Activity) => {
        props.deleteActivity(activity);
    }

    const renderList = () => {
        return (
            <IonList className="list">
                {
                    list.map((item: any) => (
                        <IonItem className="item" key={item?.id}>
                            <IonIcon
                                slot="start"
                                icon={item.type === AccountingType.INCOME ? arrowDown : arrowUp}
                                className={`icon ${item.type === AccountingType.INCOME ? 'in' : 'out'}`}
                            />
                            <IonLabel>{item?.name}</IonLabel>
                            <div className={`price`}>
                                <CurrencyFormat
                                    value={item?.amount}
                                    displayType={'text'}
                                    thousandSeparator={true}   
                                    renderText={(value: any) => <div className="price">{value}</div>}
                                />
                                <span className="unit">{UNIT}</span>
                            </div>
                        </IonItem>                   
                    ))
                }
            </IonList>
        );
    };

    return (
        <div className="container">
            <div className="filter">
                <h5>Lọc</h5>
                <IonIcon icon={filterOutline} onClick={() => {
                    presentFilter({
                        cssClass: 'modal custom',
                    });
                }}/>
            </div>
            <div className="summary">
                <IonList className="list" mode="ios">
                    <IonItem lines="none">
                        <IonLabel>Ngày: </IonLabel>
                        <div slot="end">
                            {filter.createdAt ? moment(filter.createdAt).format('DD/MM/YYYY') : '__/__/__'}
                        </div>
                    </IonItem>
                    <IonItem lines="none">
                        <IonLabel>Thu: </IonLabel>
                        <div className="price in" slot="end">
                            <CurrencyFormat
                                value={props?.amountIn}
                                displayType={'text'}
                                thousandSeparator={true}
                                renderText={(value: any) => <div>{value}</div>}
                            />
                            <span className="unit">{UNIT}</span>
                        </div>
                    </IonItem>
                    <IonItem lines="none">
                        <IonLabel>Chi: </IonLabel>
                        <div className="price out" slot="end">
                            <CurrencyFormat
                                value={props?.amountOut}
                                displayType={'text'}
                                thousandSeparator={true}
                                renderText={(value: any) => <div>{value}</div>}
                            />
                            <span className="unit">{UNIT}</span>
                        </div>
                    </IonItem>
                    <IonItem lines="none">
                        <IonLabel className="u700">TỔNG: </IonLabel>
                        <div className={`price u700 ${(props?.amountIn - props?.amountOut) >= 0 ? 'in' : 'out'}`} slot="end">
                            <CurrencyFormat
                                value={props?.amountIn - props?.amountOut}
                                displayType={'text'}
                                thousandSeparator={true}
                                renderText={(value: any) => (
                                    <div>{
                                        `${(props?.amountIn - props?.amountOut) >= 0 ? '+' : ''}  ${value}`
                                    }</div>
                                )}
                            />
                            <span className="unit">{UNIT}</span>
                        </div>
                    </IonItem>
                </IonList>
            </div>
            {
                renderList()
            }
        </div>
    );
};

const mapStateToProps = (state: any) => {
    return {
        activities: Object.values(state.activity),
        amountIn: state.accounting.amountIn,
        amountOut: state.accounting.amountOut,
        categories: Object.values(state.category)
    }
}

export default connect(
    mapStateToProps,
    {
        fetchActivities,
        fetchCategories
    }
)(Search);
