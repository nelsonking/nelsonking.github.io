---
layout: post
title:  "mysql JSON"
categories: mysql
tags: mysql
---

* content
{:toc}

## MySQL JSON
MySQL JSON 类型数据操作
ysql自5.7.8版本开始，就支持了json结构的数据存储和查询，这表明了mysql也在不断的学习和增加nosql数据库的优点。但mysql毕竟是关系型数据库，在处理json这种非结构化的数据时，还是比较别扭的。

创建JSON

 类似 varchar，设置 JSON 主要将字段的 type 是 json, 不能设置长度，可以是 NULL 但不能有默认值

CREATE TABLE muscleape
(
  id       TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
  category JSON,
  tags     JSON,
  PRIMARY KEY (id)
);
DESC muscleape;

  Field  type  Null  Key  Default  Extra    
  id  tinyint(3)  unsigned  NO  PRI  auto_increment    
  category  json  YES  ""  ""    
  tags  json  YES  ""  ""    

插如JSON数据

 1、插入 json 格式的字符串，可以是对象的形式，也可以是数组的形式;
 2、可以使用JSON_OBJECT、JSON_ARRAY函数生成；（其他JSON函数：https://dev.mysql.com/doc/refman/5.7/en/json-creation-functions.html）

-- 直接插入字符串
INSERT INTO muscleape (category, tags) VALUES ('{"id": 1,"name": "muscleape"}','[1,2,3]');
-- 使用JSON函数
INSERT INTO muscleape (category, tags) VALUES (JSON_OBJECT("id",2,"name","muscleape_q"),JSON_ARRAY(1,3,5));
-- 

添加的数据如下：

SELECT * FROM muscleape;

  id  category  tags    
  1  {"id": 1, "name": "muscleape"}  [1, 2, 3]    
  2  {"id": 2, "name": "muscleape_q"}  [1, 3, 5]    

查询JSON

 1、查询JSON中的数据用 column->path的形式，其中对象类型path的表示方式 $.path，数组类型的表示方式 $[index];

SELECT id,category->'$.id',category->'$.name',tags->'$[0]',tags->'$[2]' FROM muscleape;

  id  category->'$.id'  category->'$.name'  tags->'$[0]'  tags->'$[2]'    
  1  1  "muscleape"  1  3    
  2  2  "muscleape_q"  1  5    

 2、查询结果中字符串类型还包含有双引号，可以使用JSON_UNQUOTE函数将双引号去掉，从MySQL 5.7.13开始也可以使用操作符 ->>

SELECT id,category->'$.name',JSON_UNQUOTE(category->'$.name'),category->>'$.name',tags->'$[0]',tags->'$[2]' FROM muscleape;

  id  category->'$.name'  JSON_UNQUOTE(category->'$.name')  category->>'$.name'    
  1  "muscleape"  muscleape  muscleape    
  2  "muscleape_q"  muscleape_q  muscleape_q    

JSON 作为条件搜索

 1、JSON不同于字符串，如果直接和JSON字段比较，不会查询到结果：

-- 查询不到数据
SELECT * FROM muscleape WHERE category = '{"id": 1,"name": "muscleape"}';
-- 查询不到数据

 2、使用CAST将字符串转成JSON的形式：

SELECT * FROM muscleape WHERE category = CAST('{"id": 1,"name": "muscleape"}' AS JSON);

  id  category  tags    
  1  {"id": 1, "name": "muscleape"}  [1, 2, 3]    

 3、上面提到column->path形式从select中查询出的字符串包含双引号，这里作为查询条件是没有影响的，->和->>的结果是一样的；

-- 以下的查询结果相同
SELECT * FROM muscleape WHERE category->'$.name' = 'muscleape';
SELECT * FROM muscleape WHERE category->>'$.name' = 'muscleape';

 4、注意（MySQL：5.7.17）：JSON中的元素搜索是严格区分变量类型的，比如整型和字符串时严格区分的（->的形式），但是：->>类型是不区分的：

-- 能查到
SELECT * FROM muscleape WHERE category->'$.id' = 1;
-- 不能
SELECT * FROM muscleape WHERE category->'$.id' = '1';
-- 能查到
SELECT * FROM muscleape WHERE category->>'$.id' = 1;
-- 能查到
SELECT * FROM muscleape WHERE category->>'$.id' = '1';

 5、可以使用JSON_CONTAINS函数，但是该函数的第二个参数不接受整型，无论JSON元素时整型还是字符串(第二个参数只能是数字，不能用字符)

SELECT * FROM muscleape WHERE JSON_CONTAINS(category,1,'$.id');
-- 上面SQL执行报错，报错信息：ERROR 3146 (22001): Invalid data type for JSON data in argument 2 to function json_contains; a JSON string or JSON type is required.
SELECT * FROM muscleape WHERE JSON_CONTAINS(category,'1','$.id');
-- 可以查询到数据

 6、对于数组类型的JSON查询，比如tags中包含有2个数据，同样要用JSON_CONTAINS函数，同样第二个参数也需要是字符串

SELECT * FROM muscleape WHERE JSON_CONTAINS(tags,'1');
SELECT * FROM muscleape WHERE json_contains(tags,'[1]');
-- 数组多个值匹配查询时
SELECT * FROM muscleape WHERE json_contains(tags, '[1,2]');

更新JSON

函数：http://dev.mysql.com/doc/refman/5.7/en/json-modification-functions.html

 1、更新整个JSON，与插入时类似

UPDATE muscleape SET tags = '[1, 3, 4]' WHERE id = 1;

 2、JSON_INSERT()函数

插入新值，但不会覆盖已存在的值

UPDATE muscleape SET category = JSON_INSERT(category,'$.name','muscleape_new','$.url','muscleape.com') WHERE id = 1;
-- name没有被修改，url的值已经添加进去了

 3、JSON_SET()函数

插入新值，并覆盖已存在的值

UPDATE muscleape SET category = JSON_SET(category,'$.host','localhost','$.url','www.muscleape.com') WHERE id = 1;

 4、JSON_REPLACE()函数
 只替换已存在的值

UPDATE muscleape SET category = JSON_REPLACE(category,'$.host','127.0.0.1','$.address','shandong') WHERE id = 1;

 5、JSON_REMOVE()函数
 删除JSON元素

UPDATE muscleape SET category = JSON_REMOVE(category,'$.host','$.url') WHERE id = 1;
UPDATE muscleape SET tags = JSON_REMOVE(tags,'$[0]') WHERE id = 1;

 6、JSON_ARRAY_APPEND()数组中增加元素

UPDATE muscleape SET tags = JSON_ARRAY_APPEND(tags,'$[0]',4) WHERE id = 1;

  id  category  tags    
  1  {"id": 1, "name": "muscleape"}  [[1, 4], 2, 3]    

 7、JSON_ARRAY_INSERT()数组中添加元素

UPDATE muscleape SET tags = JSON_ARRAY_INSERT(tags,'$[0]',5) WHERE id = 1;

  id  category  tags    
  1  {"id": 1, "name": "muscleape"}  [5, [1, 4], 2, 3]    

创建索引

 MySQL的JSON格式数据不能直接创建索引，但是可以变通一下，把要搜索的数据单独拎出来，单独一个数据列，然后在这个字段上创建一个索引，官方的例子：

CREATE TABLE muscleape_office(
  c JSON,
  g INT GENERATED ALWAYS AS (c->"$.id"),
  INDEX i (g)
);
DESC muscleape_office;

  Field  type  Null  Key  Default  Extra    
  c  json  YES  ""  ""    
  g  int(11)  YES  MUL    VIRTUAL GENERATED    
INSERT INTO muscleape_office (c)
VALUES
  ('{"id": "1", "name": "Fred"}'),
  ('{"id": "2", "name": "Wilma"}'),
  ('{"id": "3", "name": "Barney"}'),
  ('{"id": "4", "name": "Betty"}');
SELECT c->>'$.name' AS name FROM muscleape_office WHERE g > 2;

  name    
  Barney    
  Betty    
EXPLAIN SELECT c->>'$.name' AS name FROM muscleape_office WHERE g > 2;

  id  select_type  table  partitions  type  posible_keys  key  key_len  ref  rows  filtered  Extra    
  1  SIMPLE  muscleape_office    range  i  i  5    2  100  Using where    


https://www.jianshu.com/p/6a9ca839c5b5
