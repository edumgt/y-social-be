class Sync {
    async syncTransaction (bankNumber, apiKey) {
        let res = await api.post('/sync', { bank_acc_id: bankNumber });
        return res;
    }
}
