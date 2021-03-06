import { Controller, useWatch } from 'react-hook-form';
import { IonSelect, IonSelectOption } from '@ionic/react';
import React from 'react';

const SelectCustom = ({ name, control, choices, type, className }: any) => {
    const valueWatch = useWatch({
        name: name,
        control
    });
    return (
        <Controller
            render={({ field: { onChange, onBlur } }) => (
                <IonSelect
                    interface={type}
                    onIonBlur={onBlur}
                    onIonChange={onChange}
                    value={valueWatch}
                    className={className}
                >
                    {
                        (choices || []).map((choice: any) => {
                            return <IonSelectOption value={choice.id} key={choice.id}>{choice.name}</IonSelectOption>
                        })
                    }
                </IonSelect>
            )}
            name={name}
            rules={{ required: true }}
            control={control}
        />
    )

}

export default SelectCustom;
