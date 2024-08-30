class IAds {
    async create(adData) {
        throw new Error('Method not implemented');
    }

    async findById(id) {
        throw new Error('Method not implemented');
    }

    async update(id, adData) {
        throw new Error('Method not implemented');
    }

    async delete(id) {
        throw new Error('Method not implemented');
    }

    async findAll() {
        throw new Error('Method not implemented');
    }

    async findByUser(userId) {
        throw new Error('Method not implemented');
    }

    async deleteAllByUser(userId) {
        throw new Error('Method not implemented');
    }

    async findTrending() {
        throw new Error('Method not implemented');
    }
}

module.exports = { IAds };
