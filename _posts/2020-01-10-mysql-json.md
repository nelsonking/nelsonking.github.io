---
layout: post
title:  "mysql JSON"
categories: mysql
tags: mysql
---

* content
{:toc}

## MySQL JSON
MySQL 5.7.8 版本开始支持json结构的数据存储和查询.




#### 创建JSON
类似 varchar，设置 JSON 主要将字段的 type 是 json, 不能设置长度，可以是 NULL 但不能有默认值
```sql
CREATE TABLE users
(
  id       INT UNSIGNED NOT NULL AUTO_INCREMENT,
  friends  JSON,  
  class_id JSON
  PRIMARY  KEY (id)
);
DESC users;

Field     type    Null      Key Default  Extra    
id        int(0)  unsigned  NO  PRI      auto_increment    
friends   json    YES       ""  ""
class_id  json    YES       ""  ""
```
   
#### 插如JSON数据
* 插入 json 格式的字符串，可以是对象的形式，也可以是数组的形式;
* 可以使用JSON_OBJECT、JSON_ARRAY函数生成；（其他JSON函数：https://dev.mysql.com/doc/refman/5.7/en/json-creation-functions.html）

```sql
-- 直接插入字符串
INSERT INTO users (friends, class_id) VALUES ('{"id": 1,"name": "liming"}','[1,2,3]');
-- 使用JSON函数
INSERT INTO users (friends, class_id) VALUES (JSON_OBJECT("id",2,"name","xiaohong"),JSON_ARRAY(2,4,6));
```
 
* 添加的数据如下：
```sql
SELECT * FROM users;
id  friends                        class_id    
1   {"id": 1, "name": "liming"}    [1, 2, 3]    
2   {"id": 2, "name": "xiaohong"}  [2, 4, 6]
```

#### 查询JSON
* 查询JSON中的数据用 column->path的形式，其中对象类型path的表示方式 $.path，数组类型的表示方式 $[index];

```sql
SELECT id,friends->'$.id',friends->'$.name',class_id->'$[0]',class_id->'$[2]' FROM users;

id  class_id->'$.id'  class_id->'$.name'  class_id->'$[0]'  class_id->'$[2]'    
1   1  "liming"  1  3    
2   2  "xiaohong"  2  6
```
    

* 查询结果中字符串类型还包含有双引号，可以使用JSON_UNQUOTE函数将双引号去掉，从MySQL 5.7.13开始也可以使用操作符 ->>

```sql
SELECT id,friends->'$.name',JSON_UNQUOTE(friends->'$.name'),friends->>'$.name',class_id->'$[0]',class_id->'$[2]' FROM users;

id  friends->'$.name'  JSON_UNQUOTE(friends->'$.name')  friends->>'$.name' class_id->'$[0]' class_id->'$[2]'   
1  "liming"  liming  liming 1 3   
2  "liming"  liming  liming 2 6
```
    

#### JSON 作为条件搜索
* JSON不同于字符串，如果直接和JSON字段比较，不会查询到结果：

```sql
-- 查询不到数据
SELECT * FROM users WHERE friends = '{"id": 1,"name": "liming"}';
```

* 使用CAST将字符串转成JSON的形式：

```sql
SELECT * FROM users WHERE friends = CAST('{"id": 1,"name": "liming"}' AS JSON);

id  category  class_id    
1  {"id": 1, "name": "liming"}  [1, 2, 3]
```
    

* 上面提到 column->path 形式从 select 中查询出的字符串包含双引号，这里作为查询条件是没有影响的，->和->>的结果是一样的；

```sql
-- 以下的查询结果相同
SELECT * FROM users WHERE friends->'$.name' = 'liming';
SELECT * FROM users WHERE friends->>'$.name' = 'liming';
```


* 注意（MySQL：5.7.17）：JSON中的元素搜索是严格区分变量类型的，比如整型和字符串时严格区分的（->的形式），但是：->>类型是不区分的：

```sql
-- 能查到
SELECT * FROM users WHERE friends->'$.id' = 1;
-- 不能
SELECT * FROM users WHERE friends->'$.id' = '1';
-- 能查到
SELECT * FROM users WHERE friends->>'$.id' = 1;
-- 能查到
SELECT * FROM users WHERE friends->>'$.id' = '1';
```


* 可以使用JSON_CONTAINS函数，但是该函数的第二个参数不接受整型，无论JSON元素时整型还是字符串(第二个参数只能是数字，不能用字符)

```sql
SELECT * FROM users WHERE JSON_CONTAINS(friends,1,'$.id');
-- 上面SQL执行报错，报错信息：ERROR 3146 (22001): Invalid data type for JSON data in argument 2 to function json_contains; a JSON string or JSON type is required.

SELECT * FROM users WHERE JSON_CONTAINS(friends,'1','$.id');
-- 可以查询到数据
```


* 对于数组类型的JSON查询，比如tags中包含有2个数据，同样要用JSON_CONTAINS函数，同样第二个参数也需要是字符串

```sql
SELECT * FROM users WHERE json_contains(class_id,'1');
SELECT * FROM users WHERE json_contains(class_id,'[1]');

-- 数组多个值匹配查询时
SELECT * FROM users WHERE json_contains(class_id, '[1,2]');
```


#### 更新JSON
* 函数：http://dev.mysql.com/doc/refman/5.7/en/json-modification-functions.html
* 语法格式为 function(json_doc, path, value[, path, value] ...)

* 更新整个JSON，与插入时类似

```sql
UPDATE users SET class_id = '[1,2,3]' WHERE id = 1;
```


* JSON_INSERT()函数
> 插入新值，但不会覆盖已存在的值

```sql
UPDATE users SET friends = JSON_INSERT(friends,'$.name','liming','$.avatar','www.avatar.com/test.img') WHERE id = 1;
-- name没有被修改，avatar的值已经添加进去了
```


* JSON_SET()函数
> 插入新值，并覆盖已存在的值

```sql
UPDATE users SET friends = JSON_SET(friends,'$.sex','boy','$.avatar','www.avatar.com/test_update.img') WHERE id = 1;
-- sex 会被添加 avatar 会被更新
```


* JSON_REPLACE()函数
> 只替换已存在的值

```sql
UPDATE users SET friends = JSON_REPLACE(friends,'$.sex','girl','$.test','test') WHERE id = 1;
-- $.test 不会被添加
```


 * JSON_REMOVE()函数
 > 删除JSON元素

```sql
UPDATE users SET friends = JSON_REMOVE(friends,'$.sex','$.avatar') WHERE id = 1;
-- $.sex $.avatar 会被删除
UPDATE users SET class_id = JSON_REMOVE(class_id,'$[0]') WHERE id = 1;
-- class_id 第一个个元素会被删除
```


* JSON_ARRAY_APPEND()数组中增加元素

```sql
UPDATE users SET tags = JSON_ARRAY_APPEND(class_id,'$[0]',4) WHERE id = 1;

id  friends  class_id    
1  {"id": 1, "name": "liming"}  [[1, 4], 2, 3]

-- 向数组后追加
```
    

* JSON_ARRAY_INSERT()数组中添加元素
```sql
UPDATE users SET tags = JSON_ARRAY_INSERT(class_id,'$[0]',5) WHERE id = 1;

id  friends  class_id    
1  {"id": 1, "name": "liming"}  [5, [1, 4], 2, 3]

-- 向数组前插入
```
    

#### 创建索引
* MySQL的JSON格式数据不能直接创建索引，但是可以变通一下，把要搜索的数据单独拎出来，单独一个数据列，然后在这个字段上创建一个索引，官方的例子：

```sql
CREATE TABLE muscleape_office(
  c JSON,
  g INT GENERATED ALWAYS AS (c->"$.id"),
  INDEX i (g)
);
```

