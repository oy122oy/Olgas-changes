from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import sqlite3

app = Flask(__name__, static_folder='.', static_url_path='')
CORS(app)

# ── create database and table ──
def init_db():
    conn = sqlite3.connect('scores.db')
    conn.execute('''
        CREATE TABLE IF NOT EXISTS scores (
            id        INTEGER PRIMARY KEY AUTOINCREMENT,
            nickname  TEXT UNIQUE,
            avatar    TEXT,
            score     INTEGER,
            percent   REAL,
            league    TEXT,
            quizname  TEXT
        )
    ''')
    conn.commit()
    conn.close()

init_db()

@app.route('/')
def index():
    return send_from_directory('.', 'savescore.html')

@app.route('/save', methods=['POST'])
def save_score():
    data = request.json
    conn = sqlite3.connect('scores.db')

    existing = conn.execute(
        'SELECT id FROM scores WHERE LOWER(nickname) = LOWER(?)',
        (data['nickname'],)
    ).fetchone()

    if existing:
        conn.execute('''
            UPDATE scores
            SET avatar=?, score=?, percent=?, league=?, quizname=?
            WHERE LOWER(nickname) = LOWER(?)
        ''', (
            data['avatar'],
            data['score'],
            data['percent'],
            data['league'],
            data.get('quizname', 'Quiz'),
            data['nickname']
        ))
        conn.commit()
        conn.close()
        return jsonify({'status': 'ok', 'updated': True})
    else:
        conn.execute('''
            INSERT INTO scores (nickname, avatar, score, percent, league, quizname)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', (
            data['nickname'],
            data['avatar'],
            data['score'],
            data['percent'],
            data['league'],
            data.get('quizname', 'Quiz')
        ))
        conn.commit()
        conn.close()
        return jsonify({'status': 'ok', 'updated': False})

@app.route('/scores', methods=['GET'])
def get_scores():
    conn = sqlite3.connect('scores.db')
    rows = conn.execute(
        'SELECT nickname, avatar, score, percent, league, quizname FROM scores ORDER BY score DESC'
    ).fetchall()
    conn.close()

    result = []
    for i, row in enumerate(rows):
        result.append({
            'rank':     i + 1,
            'nickname': row[0],
            'avatar':   row[1],
            'score':    row[2],
            'percent':  row[3],
            'league':   row[4],
            'quizname': row[5]
        })
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
