from datetime import datetime
from flask import Flask, render_template, url_for, redirect, request, session, jsonify, flash
from flask_session import Session
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
import json
import datetime

db = SQLAlchemy(session_options={'autocommit': True})

app = Flask(__name__)
app.config['SECRET_KEY'] = 'test'
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)
app.config['SQLALCHEMY_DATABASE_URI']= "postgresql://grobydomostawa:xsw23edc@matrix.umcs.pl:5432/grobydomostawa"

db.init_app(app)
db

def rows_as_dicts(cursor):
    col_names = [i[0] for i in cursor.description]
    return [dict(zip(col_names, row)) for row in cursor]


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/kontakt')
def kontakt():
    return render_template('kontakt.html')


@app.route('/cmentarz', methods=['GET', 'POST'])
def cmentarz():
    conn = db.session.connection()
    kwatery = rows_as_dicts(conn.execute(""" select * from kwatery """).cursor)
    zmarli = rows_as_dicts(conn.execute(""" 
    select zm.imie, zm.nazwisko, TO_CHAR(zm.data_urodzenia, 'DD.MM.YYYY') as data_urodzenia, TO_CHAR(zm.data_zgonu, 'DD.MM.YYYY') as data_zgonu, 
    miej.nazwa, kw.id_kwatera
    from zmarli zm

    inner join zmarli_kwatery kw on zm.id = kw.id_zmarly
    inner join kwatery k on kw.id_kwatera = k.id
    inner join administratorzy ad on zm.id_admin = ad.id_admin
    inner join miejscowosci miej on zm.id_miejscowosc = miej.id_miejscowosci;
    
     """).cursor)
    kwatery = json.dumps(kwatery)
    zmarli = json.dumps(zmarli) 
    data = [kwatery, zmarli]
    return render_template('cmentarz.html', dane = data)


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
                    return redirect(url_for('database'))
                else:
                    render_template('login.html', komunikat = komunikat)
        else:
            render_template('login.html', komunikat = komunikat) 
    return render_template('login.html', komunikat = komunikat)


@app.route('/record', methods=['GET', 'POST'])
def record():
    conn = db.session.connection()
    if ('id_admin' in session):
        if request.method == "POST":
            imie = request.form['imie']
            nazwisko = request.form['nazwisko']
            data_ur = request.form['data_urodzenia']
            data_zg = request.form['data_zgonu']
            przyczyna = request.form['przyczyna']
            miejscowosc = request.form['miejscowosc']
            nr_adres = request.form['nr_adresu']
            kwatera = request.form['kwatera']
            info_dodat = request.form['info_dodat']
        
            id_miejscowosci = rows_as_dicts(conn.execute(""" select id_miejscowosci from miejscowosci where nazwa = '{}' """.format(miejscowosc)).cursor)
            max_id = rows_as_dicts(conn.execute(""" select max(id) from zmarli """).cursor)
            max_id_2 = rows_as_dicts(conn.execute(""" select max(id) from zmarli_kwatery """).cursor)

            conn.execute(""" insert into zmarli (id, nazwisko, imie, data_urodzenia, data_zgonu, przyczyna, id_miejscowosc, nr_adres, id_admin, inf_dodat) VALUES ('{}', '{}', '{}', '{}', '{}', '{}', '{}', '{}', '{}', '{}') """.format(str(int(max_id[0]['max'])+1), nazwisko, imie,data_ur, data_zg, przyczyna, id_miejscowosci[0]['id_miejscowosci'], nr_adres, session.get('id_admin')['id_admin'], info_dodat))
            conn.execute(""" insert into zmarli_kwatery (id_kwatera, id, id_zmarly) VALUES ('{}', '{}', '{}') """.format(kwatera, str(int(max_id_2[0]['max'])+1), str(int(max_id[0]['max'])+1)))
        return render_template('record.html')
    else:
        return redirect('/login')


@app.route('/database')
def database():
    conn = db.session.connection()
    if ('id_admin' in session):
        
        data = rows_as_dicts(conn.execute(""" 
        select zm.id, zm.imie, zm.nazwisko, TO_CHAR(zm.data_urodzenia, 'DD.MM.YYYY') as data_urodzenia, TO_CHAR(zm.data_zgonu, 'DD.MM.YYYY') as data_zgonu, zm.przyczyna, zm.inf_dodat, 
        miej.nazwa, zm.nr_adres, kw.id_kwatera, zm.id_admin, ad.status
        from zmarli zm

        inner join zmarli_kwatery kw on zm.id = kw.id_zmarly
        inner join kwatery k on kw.id_kwatera = k.id
        inner join administratorzy ad on zm.id_admin = ad.id_admin
        inner join miejscowosci miej on zm.id_miejscowosc = miej.id_miejscowosci

         order by zm.data_zgonu;
    
        """).cursor)
        return render_template('database.html', data = data)
    else:
        return redirect('/login')


#@app.route('/database/<imie_nazwisko><rok_zgonu><miejscowosc>', methods=['GET', 'POST'])
#def admin_database_action(action):
#    conn = db.session.connection()
#    if(action == 'edytuj'):
#        #akcja
#        return 0
#    elif(action == 'usuń'):
#        #akcja
#        return 0


@app.route('/add_mass', methods = ['GET', 'POST'])
def add_mass():
    conn = db.session.connection()
    if ('id_admin' in session):
        if request.method == 'POST':
            data = request.form['data']
            godzina = request.form['czas']
            zamawiajacy = request.form['zamawiajacy']
            odprawia = request.form['odprawia']
            ofiara = request.form['ofiara']
            data_str = data + ' ' + godzina
            data_obj = datetime.datetime.strptime(data_str, '%Y-%m-%d %H:%M')
            conn.execute(""" insert into msze (data, zamawiajacy, odprawia, ofiara) VALUES ('{}', '{}', '{}', '{}') """.format(data_obj, zamawiajacy, odprawia, ofiara))
        return render_template('add_mass.html')
    else:
        return redirect('/login')


@app.route('/admin_database')
def admin_database():
    conn = db.session.connection()
    if ('id_admin' in session):
        data = rows_as_dicts(conn.execute("""

        select id_admin, imie, nazwisko, status from administratorzy

        """).cursor)
        return render_template('admin_database.html', data = data)
    else:
        return redirect('/login')

#@app.route('/admin_database/<action1><action2>', methods=['GET', 'POST'])
#def admin_database_action(action):
#    conn = db.session.connection()
#    if(action == 'edytuj'):
#        #akcja
#        return 0
#    elif(action == 'usuń'):
#        #akcja
#        return 0


@app.route('/mass_database', methods = ['GET', 'POST'])
def mass_database():
    conn = db.session.connection()
    if ('id_admin' in session):
        data = rows_as_dicts(conn.execute("""

        select * from msze
        order by data

        """).cursor)
        return render_template('mass_database.html', data = data)
    else:
        return redirect('/login')

@app.route('/new_admin', methods=['GET', 'POST'])
def new_admin():
    conn = db.session.connection()
    if ('id_admin' in session):
        if request.method == "POST":
            imie = request.form['imie']
            nazwisko = request.form['nazwisko']
            id_admina = request.form['id_admina']
            status = request.form['status']
            haslo = request.form['password']
            hash_haslo = generate_password_hash(haslo)
            conn.execute(""" insert into administratorzy (id_admin, nazwisko, imie, status, haslo) VALUES ('{}', '{}', '{}', '{}', '{}')""".format(id_admina, nazwisko, imie, status, hash_haslo))
        return render_template('new_admin.html')
    else:
        redirect('/login')

if __name__ == "__main__":
    app.run(debug=True)


