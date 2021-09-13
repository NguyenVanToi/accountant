import { IonButton, IonChip, IonDatetime, IonIcon, IonInput, IonItem, IonLabel } from '@ionic/react';
import { checkmarkCircleOutline, arrowDown, arrowUp, handLeft } from 'ionicons/icons';
import moment from 'moment';
import { useEffect, useState } from 'react';
import CurrencyFormat from 'react-currency-format';
import { connect } from 'react-redux';
import { AccountingType, SummaryType, UNIT } from '../../_core/constants';
import './../../global.css';
import './SummaryView.css';
import { matchSummary } from '../../redux/actions/summaryAction';

const SummaryView: React.FC = (props: any) => {
    const [filter, setFilter] = useState({
            type: SummaryType.DAY as string,
            value: moment().format('YYYY-MM-DD')
        }
    );
    const [selectedDate, setSelectedDate] = useState<string>(moment().format('YYYY-MM-DD'));
    const summaryTypes = Object.keys(SummaryType).map(type => {
        return {id: type, label: type};
    }).slice(0, -1);    

    useEffect(() => {
        
    }, []);

    const onChangeTypeFilter = (type: string) => {
        let value: any = moment().format('YYYY-MM-DD');
        switch(type) {
            case SummaryType.WEEK:
                value = moment().get('week');
                break;
            case SummaryType.MONTH:
                value = moment().get('month') + 1;
        }
        setFilter({...filter, type, value })
    }
    const onChangeFilter = (e: any) => {
        const type = e.target.name;
        let value = e.target.value;
        if (type === SummaryType.DAY) {
            value = e.detail.value;
        }
        setFilter({...filter, value})
        
    }
    const handleFilter = () => {
        props.matchSummary(filter);
    }

    const renderAccounting = (type: string, value: number) => {
        return (
            <div className="item">
                <IonIcon
                    slot="start"
                    icon={type === AccountingType.INCOME ? arrowDown : arrowUp}
                    className={`icon ${type === AccountingType.INCOME ? 'in' : 'out'}`}
                />
                <IonLabel className="label">{type === AccountingType.INCOME ? 'Thu nhập' : 'Chi tiêu'}</IonLabel>
                <div className={`price`}>
                    <CurrencyFormat
                        value={value}
                        displayType={'text'}
                        thousandSeparator={true}   
                        renderText={(value: any) => <div className="price">{value}</div>}
                    />
                    <span className="unit">{UNIT}</span>
                </div>
            </div>       
        )
    }

    const renderSummary = (dataSummary: any) => {
        if (!dataSummary) {
            return null;
        }
        
        return dataSummary.map((element: any) => {
            const total = element.value.inComes - element.value.outComes;
            return (
                <div className="card" key={element.nameCategory}>
                    <div className="header">
                        <span className="caption">{element.nameCategory}</span>
                        <div className={`price ${total > 0 ? 'in' : 'out'}`}>
                            <CurrencyFormat
                                value={ total }
                                displayType={'text'}
                                thousandSeparator={true}   
                                renderText={(value: any) => <div className="caption">{value}</div>}
                            />
                            <span className="unit">{UNIT}</span>
                        </div>
                    </div>
                    <div className="content">
                        {renderAccounting(AccountingType.OUTCOME, element.value.outComes)}
                        {renderAccounting(AccountingType.INCOME, element.value.inComes)}
                    </div>
                </div>
            )
        })
    }

    const renderFilterType = (type: string) => {
        switch(type) {
            case SummaryType.DAY:
                return (
                    <IonDatetime
                        className="datetime"
                        displayFormat="YYYY-MM-DD"
                        min="2021-01-01"
                        value={filter.value}
                        onIonChange={e => onChangeFilter(e)}
                    >
                    </IonDatetime>
                )
            case SummaryType.WEEK:
            case SummaryType.MONTH:
                return (
                    <IonInput
                        className="datetime"
                        name={type}
                        value={filter.value}
                        onIonChange={e => onChangeFilter(e)}
                    />
                )
        }
    }

    const renderFilter = () => {
        return (
            <div className="filter-summary">
                <h3>Năm {moment().get('year')}: </h3>
                {
                    summaryTypes.map(type => (
                        <IonChip
                            key={type.id}
                            onClick={() => onChangeTypeFilter(type.id)}
                            color={`${filter.type === type.id ? 'primary' : 'medium'}`}
                            className="chip"
                        >
                            <IonIcon color={`${filter.type === type.id ? 'primary' : 'medium'}`} icon={checkmarkCircleOutline} />
                            <IonLabel color={`${filter.type === type.id ? 'primary' : 'medium'}`}>{type.label}</IonLabel>
                        </IonChip>
                    ))
                }
                <div className="filter-content">
                    { renderFilterType(filter.type) }
                    <IonButton 
                        onClick={() => handleFilter()}
                        color="primary" 
                        size="small"
                    >Tra cứu</IonButton>
                </div>
            </div>
        )
    }


    return (
        <div className="container summary-view">
            {renderFilter()}  
            {renderSummary(props.summaries)}
        </div>
    );
};

const mapStateToProps = (state: any) => {
    console.log(state);
    
    return {
        summaries: state.summary.data
    }
}

export default connect(
    mapStateToProps,
    {
        matchSummary
    }
)(SummaryView);
