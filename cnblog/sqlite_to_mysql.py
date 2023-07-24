# pip3 install pymysql
import sqlite3 # Python 内置模块
import pymysql


# 连接 SQLite 数据库
conn_sqlite = sqlite3.connect('./cnblogs_blog_jaycethanks.20230724090925.db')
cursor_sqlite = conn_sqlite.cursor()

# 执行 SELECT 查询语句
cursor_sqlite.execute('SELECT id, Title, CreatedTime, IsMarkdown, Body, AutoDesc FROM blog_Content bc')
results = cursor_sqlite.fetchall()

# 转换查询结果的字段名和数据类型
converted_results = []
for row in results:
    converted_row = {
        'artid': row[0],  # 将 id 字段映射为 artid
        'sort': 0,
        'author_id': '1d58a529-51d8-475d-b923-e8d35471624b',
        'title': row[1],
        'description': None,  # 将 AutoDesc 字段映射为 description
        'content': row[4],
        'keywords': '',
        'status': 1,
        'cover': '',
        'visible': 1,
        'allow_comment': 1,
        'liking': 0,
        'readers': 0,
        'banner': 0,
        'catid': None,
        'colid': None,# 要在 Python 中将 NULL 值插入到 MySQL 数据库中，可以使用 None 代替 NULL 值
        'created_at': row[2],
        'updated_at': row[2]
    }
    converted_results.append(converted_row)

# 连接 MySQL 数据库
conn_mysql = pymysql.connect(
    host='localhost',
    user='root',
    password='123456',
    database='zhongyi_blog_prisma',
    charset='utf8mb4',
    port=3396
)
cursor_mysql = conn_mysql.cursor()

# 将转换后的数据插入 MySQL 数据库
for row in converted_results:
    cursor_mysql.execute("""
        INSERT INTO `t_articles` 
        (`artid`, `sort`, `author_id`, `title`, `description`, `content`, `keywords`, `status`, `cover`, `visible`, `allow_comment`, `liking`, `readers`, `banner`, `catid`, `created_at`, `updated_at`) 
        VALUES (%(artid)s, %(sort)s, %(author_id)s, %(title)s, %(description)s, %(content)s, %(keywords)s, %(status)s, %(cover)s, %(visible)s, %(allow_comment)s, %(liking)s, %(readers)s, %(banner)s, %(catid)s, %(created_at)s, %(updated_at)s)
    """, row)

# 提交事务并关闭连接
conn_mysql.commit()
conn_mysql.close()