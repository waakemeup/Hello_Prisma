### Prisma Learn Notes
- 建模上,类似于TypeORM
```prisma
model Post {
  @@map(name:"post")
  id Int @id @default(autoincrement())
  title String 
  post String @db.VarChar(500)
  created_at DateTime @default(now())
  updated_at DateTime @updatedAt
  user User @relation(fields: [user_id],references: [id])
  user_id Int
}
```
@@map类似于别名  
也会使用装饰器语法@  
设置关联时`user User @relation(fields: [user_id],references: [id])` fileds后是自己的表数据,references后接前面这里是User里的id
- 关键命令
```fish
npx prisma migrate dev --name init   
```
按时间戳生成migrations

```fish
npx prisma introspect --force   
```
强制更新prisma文件里内容,并且与数据库同步
```fish
npx prisma studio  
```
打开其自带的页面,非常好用