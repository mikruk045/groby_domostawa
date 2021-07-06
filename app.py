from flask import Flask, render_template, url_for, redirect, request, session, jsonify, flash
from flask_session import Session
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
import json

db = SQLAlchemy(session_options={'autocommit': True})

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI']= "postgresql://grobydomostawa:xsw23edc@matrix.umcs.pl:5432/grobydomostawa"
app.config['SECRET_KEY'] = 'test'
db.init_app(app)
Session(app)

db

def rows_as_dicts(cursor):
    col_names = [i[0] for i in cursor.description]
    return [dict(zip(col_names, row)) for row in cursor]


@app.route('/', methods=['GET', 'POST'])
def index():
    conn = db.session.connection()
    kwatery = rows_as_dicts(conn.execute(""" select * from kwatery """).cursor)
    data = rows_as_dicts(conn.execute(""" 
    select zm.imie, zm.nazwisko, zm.data_urodzenia, zm.data_zgonu, 
    miej.nazwa, kw.id_kwatera
    from zmarli zm

    inner join zmarli_kwatery kw on zm.id = kw.id_zmarly
    inner join kwatery k on kw.id_kwatera = k.id
    inner join administratorzy ad on zm.id_admin = ad.id_admin
    inner join miejscowosci miej on zm.id_miejscowosc = miej.id_miejscowosci;
    
     """).cursor)
    kwatery = json.dumps(kwatery)
    zmarli = json.dumps(data) 
    data = [kwatery, zmarli]
    return render_template('index.html', dane = data)



@app.route('/login', methods=['GET', 'POST'])
def login():
    komunikat = ""
    if request.method == 'POST':
        komunikat = "Login lub hasło jest niepoprawne."
        username = request.form['username']
        password = request.form['password']
        conn = db.session.connection()
        id_admina_get = rows_as_dicts(conn.execute(""" select id_admin from administratorzy where id_admin = '{}'""".format(username)).cursor)
        if(id_admina_get != []):
            id_admina = id_admina_get[0]
            if (username in id_admina.values()):
                haslo = rows_as_dicts(conn.execute(""" select haslo from administratorzy where id_admin = '{}'""".format(username)).cursor)[0]
                if (check_password_hash(haslo['haslo'], password)):
                    session['id_admin'] = id_admina_get[0]
                    return redirect(url_for('panel'))
                else:
                    render_template('login.html', komunikat = komunikat)
        else:
            render_template('login.html', komunikat = komunikat) 
    return render_template('login.html', komunikat = komunikat)

@app.route('/panel')
def panel():
    return render_template('panel.html')

@app.route('/record', methods=['GET', 'POST'])
def record():
    conn = db.session.connection()
    if request.method == "POST":
        imie = request.form['imie']
        nazwisko = request.form['nazwisko']
        data_ur = request.form['data_urodzenia']
        data_zg = request.form['data_zgonu']
        przyczyna = request.form['przyczyna']
        miejscowosc = request.form['miejscowosc']
        nr_adres = request.form['nr_adresu']
        kwatera = request.form['kwatera']
        
        id_miejscowosci = rows_as_dicts(conn.execute(""" select id_miejscowosci from miejscowosci where nazwa = '{}' """.format(miejscowosc)).cursor)
        max_id = rows_as_dicts(conn.execute(""" select max(id) from zmarli """).cursor)
        max_id_2 = rows_as_dicts(conn.execute(""" select max(id) from zmarli_kwatery """).cursor)
        print(id_miejscowosci[0]['id_miejscowosci'])
        print(max_id)

        conn.execute(""" insert into zmarli (id, nazwisko, imie, data_urodzenia, data_zgonu, przyczyna, id_miejscowosc, nr_adres, id_admin) VALUES ('{}', '{}', '{}', '{}', '{}', '{}', '{}', '{}', '{}') """.format((int(max_id[0]['max'])+1), nazwisko, imie,data_ur, data_zg, przyczyna, id_miejscowosci[0]['id_miejscowosci'], nr_adres, session['id_admin']))
        conn.execute(""" insert into zmarli_kwatery (id_kwatera, id, id_zmarly) VALUES ('{}', '{}', '{}') """.format(kwatera, (int(max_id_2[0]['max'])+1), (int(max_id[0]['max'])+1)))
    return render_template('record.html')

@app.route('/database')
def database():
    conn = db.session.connection()
    data = rows_as_dicts(conn.execute(""" 
    select zm.imie, zm.nazwisko, zm.data_urodzenia, zm.data_zgonu, zm.przyczyna, 
    miej.nazwa, zm.nr_adres, kw.id_kwatera, ad.id_admin, ad.status
    from zmarli zm

    inner join zmarli_kwatery kw on zm.id = kw.id_zmarly
    inner join kwatery k on kw.id_kwatera = k.id
    inner join administratorzy ad on zm.id_admin = ad.id_admin
    inner join miejscowosci miej on zm.id_miejscowosc = miej.id_miejscowosci

    
    order by zm.data_zgonu;
    
     """).cursor)
    return render_template('database.html', data = data)

@app.route('/new_admin', methods=['GET', 'POST'])
def new_admin():
    conn = db.session.connection()
    if request.method == "POST":
        imie = request.form['imie']
        nazwisko = request.form['nazwisko']
        id_admina = request.form['id_admina']
        status = request.form['status']
        haslo = request.form['password']
        hash_haslo = generate_password_hash(haslo)

        conn.execute(""" insert into administratorzy (id_admin, nazwisko, imie, status, haslo) VALUES ('{}', '{}', '{}', '{}', '{}')""".format(id_admina, nazwisko, imie, status, hash_haslo))

    return render_template('new_admin.html')

if __name__ == "__main__":
    app.run(debug=True)


