import mysql.connector

# 设置数据库连接参数
db_config = {
    'host': 'localhost',  # 数据库主机地址
    'user': 'root',  # 数据库用户名
    'password': '12onetwo',  # 数据库密码
    'database': 'SNWDB'  # 数据库名称
}


class DBHandler:
    def __init__(self, conn):
        self.conn = conn

    def insert(self, data):
        cursor = self.conn.cursor()
        values = "{},{},{},{}".format(data.platform, data.location, data.time, data.flag)
        insert_query = "INSERT INTO snw VALUES {};".format(values)
        cursor.execute(insert_query)
        self.conn.commit()


class Data:
    def __init__(self, platform, location, time, flag, trend):
        self.platform = platform
        self.location = location
        self.time = time
        self.flag = flag
        self.trend = trend


# 连接到数据库
try:
    connection = mysql.connector.connect(**db_config)
    snw_db = DBHandler(connection)
except mysql.connector.Error as e:
    print(f'连接错误: {e}')
finally:
    # 最后一定要关闭数据库连接
    if 'connection' in locals():
        connection.close()
        print('数据库连接已关闭')
