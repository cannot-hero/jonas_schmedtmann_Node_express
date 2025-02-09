class APIFeatures {
    constructor(query, queryString) {
        this.query = query
        this.queryString = queryString
    }

    filter() {
        const queryObj = { ...this.queryString }
        const excludeFields = ['page', 'limit', 'sort', 'fields']
        excludeFields.forEach(el => delete queryObj[el])
        // 1B) Advanced filtering
        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(
            /\b(gte|gt|lte|lt)\b/g,
            match => `$${match}`
        ) // 正则表达式
        // console.log(JSON.parse(queryStr))
        this.query.find(JSON.parse(queryStr))
        // let query = Tour.find(JSON.parse(queryStr))
        return this
    }

    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
            // second criteria  query.sort('price ratingsAverage')
        } else {
            // 默认排序
            this.query = this.query.sort('-createAt')
        }
        return this
    }

    limitFields() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ')
            this.query = this.query.select(fields)
        } else {
            this.query = this.query.select('-__v')
        }

        return this
    }

    paginate() {
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 100
        const skip = (page - 1) * limit
        // page=2&limit=10  1-10 page 1 11-20 page 2
        this.query = this.query.skip(skip).limit(limit)
        return this
    }
}

module.exports = APIFeatures
