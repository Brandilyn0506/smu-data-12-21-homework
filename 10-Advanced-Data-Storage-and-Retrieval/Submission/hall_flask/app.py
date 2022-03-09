import numpy as np
import pandas as pd
from flask import Flask, jsonify
from sqlalchemy import create_engine


app = Flask(__name__)

# database setup
path = "sqlite:///Resources/hawaii.sqlite"
engine = create_engine(path)

# create routes
@app.route("/")
def home():
    return (
        f"Available Routes:<br>"
        f"==================================================<br>"
        f"/api/v1.0/precipitation<br>"
        f"/api/v1.0/stations<br>"
        f"/api/v1.0/tobs<br>"
        f"/api/v1.0/2016-06-01<br>"
        f"/api/v1.0/2016-06-01/2016-08-31<br>"
    )

@app.route("/api/v1.0/precipitation")
def prcp():
    conn = engine.connect()
    query = """
            SELECT date, station, prcp
            FROM measurement
            ORDER BY date asc, station asc
            """

    df = pd.read_sql(query, conn)
    conn.close()
    data = df.to_dict(orient="records")
    return(jsonify(data))

@app.route("/api/v1.0/stations")
def station():
    conn = engine.connect()
    query = """
            SELECT *
            FROM station
            """

    df2 = pd.read_sql(query, conn)
    conn.close()
    data1 = df2['station'].values.tolist()
    return(jsonify(data1))

@app.route("/api/v1.0/tobs")
def temps():
    conn = engine.connect()
    query = """
        SELECT date, tobs
        FROM measurement
        WHERE station = 'USC00516128' AND date >= '2016-08-23'
        """
    df3 = pd.read_sql(query, conn)

    conn.close()
    data2 = df3['tobs'].values.tolist()
    return(jsonify(data2))


@app.route("/api/v1.0/2016-06-01")
def start():
    conn = engine.connect()
    query= """
        SELECT AVG(tobs) AS "Average temp",
        MAX(tobs) AS "Max temp", 
        MIN(tobs) AS "Min temp"
        FROM measurement
        WHERE date = '2016-06-01';
        """
    df4 = pd.read_sql(query, conn)

    conn.close()
    data3 = df4.to_dict(orient="records")
    return(jsonify(data3))

@app.route("/api/v1.0/2016-06-01/2016-08-31")
def startend():
    conn = engine.connect()
    query= """
        SELECT AVG(tobs) AS "tavg",
        MAX(tobs) AS "tmax",
        MIN(tobs) AS "tmin"
        FROM measurement
        WHERE date >= '2016-06-01' AND date <= '2016-08-31';
        """
    df5 = pd.read_sql(query, conn)

    conn.close()
    data4 = df5.to_dict(orient="records")
    return(jsonify(data4))

if __name__ == '__main__':
    app.run(debug=True)

   