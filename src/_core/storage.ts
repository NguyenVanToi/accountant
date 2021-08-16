export default {
    save: function (key: string, value: any, expirationSec: number) {
        if (typeof (Storage) === "undefined") {
            return false;
        }
        const expirationMS = expirationSec * 1000;
        const record = { value: value, timestamp: new Date().getTime() + expirationMS };
        localStorage.setItem(key, JSON.stringify(record));

        return value;
    },
    load: function (key: string) {
        if (typeof (Storage) === "undefined") {
            return false;
        }
        try {
            const record = JSON.parse(localStorage.getItem(key) || '');
            if (!record) {
                return false;
            }
            return (new Date().getTime() < record.timestamp && record.value);
        } catch (e) {
            return false;
        }
    },
    remove: function (key: string) {
        if (typeof (Storage) === "undefined") {
            return false;
        }
        localStorage.removeItem(key);
    },
    update: function (key: string, value: any) {
        if (typeof (Storage) === "undefined") {
            return false;
        }
        try {
            const record = JSON.parse(localStorage.getItem(key) || '');
            if (!record) {
                return false;
            }
            const updatedRecord = { value: value, timestamp: record.timestamp };
            localStorage.setItem(key, JSON.stringify(updatedRecord));
            return updatedRecord;
        } catch (e) {
            return false;
        }
    }
};
