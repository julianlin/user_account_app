import os
import sqlite3
import csv
from typing import List

DB_NAME = 'user_account_app.db'


class Database:
  def __init__(self):
    if os.path.exists(DB_NAME):
      os.remove(DB_NAME)

    self.create_user_table()
    self.insert_user_rows_from_csv()


  def create_user_table(self) -> None:
    query_str = """
    CREATE TABLE user(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    first_name TEXT,
    last_name TEXT,
    password TEXT,
    phone_number INTEGER,
    is_admin INTEGER,
    invitation_code TEXT)
    """

    self.execute(query_str=query_str)

  def get_connection(self) -> sqlite3.Connection:
    return sqlite3.connect(DB_NAME)
  
  def insert_user_rows_from_csv(self):
    conn = self.get_connection()
    cur = conn.cursor()

    with open('user.csv', 'r') as fp:
      dr = csv.DictReader(fp)
      to_db = [
        (i['email'], i['first_name'], i['last_name'], i['password'],
          i['phone_number'], i['is_admin'], i['invitation_code']) for i in dr]

    cur.executemany(
      """
      INSERT INTO user 
      (email, first_name, last_name, password,
       phone_number, is_admin, invitation_code)
      VALUES (?, ?, ?, ?, ?, ?, ?)""", 
      to_db)
    conn.commit()
    conn.close()

  def execute(self, query_str) -> bool:
    try:
      conn = self.get_connection()
      cur = conn.cursor()
      cur.execute(query_str)
      conn.commit()
      conn.close()
      return True
    except Exception as e:
      print(e)
      return False

  def select(self, query_str: str) -> List[tuple]:
    conn = self.get_connection()
    cur = conn.cursor()
    cur.execute(query_str)
    rows = cur.fetchall()
    conn.close()
    return rows
  
  def select_one(self, query_str: str) -> tuple:
    conn = self.get_connection()
    cur = conn.cursor()
    cur.execute(query_str)
    row = cur.fetchone()
    conn.close()
    return row
