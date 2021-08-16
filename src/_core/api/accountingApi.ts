import { Api } from "./api";
import storage from './../storage';
import { API_URL } from '../environment';

export class AccountingApi extends Api<any> {
    constructor() {
        const authorization = storage.load("authorization");

        super({
            baseUrl: API_URL,
            baseApiParams: {
                headers:
                    {
                        'Authorization': authorization,
                        'Content-Type': 'application/json'
                    }
            }
        });
    }
}

// {"transactionInformation":"textarasasd"}
