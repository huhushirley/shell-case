const db = db.getSiblingDB('db')

// 联合索引
db.collections.createIndex(
  {
    id1: 1, // 升序
    id2: -1 // 降序
  },
  {
    background: true
  }
)

// 部分索引
db.collections.createIndex(
  {
    id1: 1, // 升序
    id2: -1 // 降序
  },
  {
    partialFilterExpression: { 'id1': { $exists: true } },
    background: true
  }
)