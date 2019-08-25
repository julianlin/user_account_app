import os
import sqlite3
import csv
from typing import List

DB_NAME = 'user_account_app.db'

class Database:
    def __init__(self):
        if os.path.exists(DB_NAME):
            os.remove(DB_NAME)

        conn = sqlite3.connect(DB_NAME)
        cur = conn.cursor()

        cur.execute("""CREATE TABLE user(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT,
            first_name TEXT,
            last_name TEXT,
            password TEXT,
            phone_number INTEGER,
            is_admin INTEGER);"""
        )

        with open('user.csv', 'r') as fp:
            dr = csv.DictReader(fp)
            to_db = [(i['email'], i['first_name'], i['last_name'], i['password'], i['phone_number'], i['is_admin']) for i in dr]
        cur.executemany("INSERT INTO user (email, first_name, last_name, password, phone_number, is_admin) VALUES (?, ?, ?, ?, ?, ?);", to_db)
        conn.commit()
        conn.close()

    def get_cursor(self) -> sqlite3.Cursor:
        conn = sqlite3.connect(DB_NAME)
        return conn.cursor()

    def select(self, query_str: str) -> List[tuple]:
        cur = self.get_cursor()
        cur.execute(query_str)
        return cur.fetchall()
    
    def select_one(self, query_str: str) -> tuple:
        cur = self.get_cursor()
        cur.execute(query_str)
        return cur.fetchone()
